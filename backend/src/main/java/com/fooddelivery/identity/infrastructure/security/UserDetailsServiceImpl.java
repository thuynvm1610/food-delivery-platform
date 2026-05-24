package com.fooddelivery.identity.infrastructure.security;

import com.fooddelivery.identity.infrastructure.persistence.repository.SpringDataUserJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final SpringDataUserJpaRepository userJpaRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        var userEntity = userJpaRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));

        return new AuthUserDetails(
                userEntity.getId(),
                userEntity.getEmail(),
                userEntity.getPasswordHash(),
                userEntity.getRole().getName()
        );
    }
}
