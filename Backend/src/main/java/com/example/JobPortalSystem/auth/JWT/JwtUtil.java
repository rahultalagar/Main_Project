package com.example.JobPortalSystem.auth.JWT;

import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

    // 🔐 Secret key (keep it long & secure in real projects)
    private final String SECRET_KEY = "mysecretkeymysecretkeymysecretkey12345";

    // ⏰ Token validity (1 day = 24 * 60 * 60 * 1000 ms)
    private final long EXPIRATION_TIME = 86400000;

    // 🔑 Generate signing key from secret
    private Key getSignKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    // 🚀 Generate JWT token
    public String generateToken(Long userId, String email, String role) {

        return Jwts.builder()
                .subject(email) // 👈 subject = email (used for login identity)
                .claim("userId", userId)
                .claim("role", role) // 👈 custom claim (USER / RECRUITER / ADMIN)
                .issuedAt(new Date(System.currentTimeMillis())) // token created time
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME)) // expiry
                .signWith(getSignKey()) // sign token with secret key
                .compact();
    }

    // 🔍 Extract all claims from token
    public Claims extractAllClaims(String token) {
        return Jwts.parser()
                .setSigningKey(getSignKey()) // ✅ FIXED LINE
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // 📧 Extract email (subject)
    public String extractEmail(String token) {
        return extractAllClaims(token).getSubject();
    }

    // 👤 Extract userId
    public Long extractUserId(String token) {
        return extractAllClaims(token).get("userId", Long.class);
    }

    // 🏷 Extract role
    public String extractRole(String token) {
        return extractAllClaims(token).get("role", String.class);
    }

    // ⏳ Check if token expired
    public boolean isTokenExpired(String token) {
        return extractAllClaims(token).getExpiration().before(new Date());
    }

    // ✅ Validate token
    public boolean validateToken(String token, String email) {
        String extractedEmail = extractEmail(token);
        return (extractedEmail.equals(email) && !isTokenExpired(token));
    }
}