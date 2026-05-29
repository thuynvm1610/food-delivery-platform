import React, { useEffect, useState } from 'react';
import { restaurantApi } from '../../api/restaurant';
import { notifyError } from '../../utils/notify';
import type { Wallet, WalletTransaction } from '../../types/restaurant';

export const RestaurantRevenue: React.FC = () => {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [walletRes, transRes] = await Promise.all([
        restaurantApi.getWallet(),
        restaurantApi.getWalletTransactions(),
      ]);
      setWallet(walletRes.data.data);
      setTransactions(transRes.data.data);
    } catch (err) {
      notifyError('Không thể tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Ví & doanh thu</h1>

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <>
          {wallet && (
            <div className="rounded-3xl bg-gradient-to-r from-blue-500 to-blue-700 p-8 shadow-sm text-white">
              <p className="text-sm opacity-80">Số dư ví</p>
              <p className="text-4xl font-bold mt-2">{wallet.balanceAmount.toLocaleString()}₫</p>
              <p className="text-sm opacity-80 mt-4">Tài khoản ngân hàng liên kết</p>
            </div>
          )}

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="font-bold text-lg mb-4">Lịch sử giao dịch</h2>
            <div className="space-y-2 max-h-[26rem] overflow-y-auto">
              {transactions.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Chưa có giao dịch nào</p>
              ) : (
                transactions.map(tx => (
                  <div key={tx.id} className="flex justify-between items-center py-3 border-b last:border-b-0">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {tx.type === 'RESTAURANT_REVENUE'
                          ? 'Doanh thu'
                          : tx.type === 'COMMISSION_FEE'
                            ? 'Phí hoa hồng'
                            : tx.type}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(tx.createdAt).toLocaleString('vi-VN')}
                      </p>
                    </div>
                    <p className={`font-bold text-lg ${tx.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()}₫
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
