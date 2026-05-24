import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import javax.crypto.SecretKey;
import java.util.Date;
import java.util.UUID;

public class JwtQuickTest {
    public static void main(String[] args) {
        String secret = "404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970";
        try {
            byte[] keyBytes = Decoders.BASE64.decode(secret);
            System.out.println("key bytes: " + keyBytes.length);
            SecretKey key = Keys.hmacShaKeyFor(keyBytes);
            String token = Jwts.builder()
                .subject(UUID.randomUUID().toString())
                .claim("role", "ROLE_CUSTOMER")
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 900000))
                .signWith(key)
                .compact();
            System.out.println("OK: " + token.substring(0, 20));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
