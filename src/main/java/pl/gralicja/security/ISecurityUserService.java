package pl.gralicja.security;

public interface ISecurityUserService {

    String validatePasswordResetToken(long id, String token);

}
