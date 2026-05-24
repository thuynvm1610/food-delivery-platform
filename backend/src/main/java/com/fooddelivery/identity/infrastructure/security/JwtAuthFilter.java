package com.fooddelivery.identity.infrastructure.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final AuthCookieService authCookieService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        if (SecurityContextHolder.getContext().getAuthentication() != null) {
            filterChain.doFilter(request, response);
            return;
        }

        resolveAccessToken(request).ifPresent(token -> authenticate(token, request));

        filterChain.doFilter(request, response);
    }

    private java.util.Optional<String> resolveAccessToken(HttpServletRequest request) {
        return authCookieService.readCookie(request, AuthCookieService.ACCESS_TOKEN_COOKIE)
                .filter(jwtService::isTokenValid)
                .or(() -> {
                    String authHeader = request.getHeader("Authorization");
                    if (authHeader != null && authHeader.startsWith("Bearer ")) {
                        String token = authHeader.substring(7);
                        if (jwtService.isTokenValid(token)) {
                            return java.util.Optional.of(token);
                        }
                    }
                    return java.util.Optional.empty();
                });
    }

    private void authenticate(String token, HttpServletRequest request) {
        var userId = jwtService.extractUserId(token);
        var role = jwtService.extractRole(token);
        var principal = new AuthenticatedUser(userId, null, role);
        var authorities = List.of(new SimpleGrantedAuthority(role));
        var authToken = new UsernamePasswordAuthenticationToken(principal, null, authorities);
        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authToken);
    }
}
