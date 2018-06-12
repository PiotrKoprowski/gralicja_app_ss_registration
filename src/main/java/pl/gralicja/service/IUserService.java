package pl.gralicja.service;

import java.util.List;

import pl.gralicja.persistence.model.PasswordResetToken;
import pl.gralicja.persistence.model.User;
import pl.gralicja.persistence.model.VerificationToken;
import pl.gralicja.web.dto.UserDto;
import pl.gralicja.web.error.UserAlreadyExistException;

public interface IUserService {

    User registerNewUserAccount(UserDto accountDto) throws UserAlreadyExistException;

    User getUser(String verificationToken);

    void saveRegisteredUser(User user);

    void deleteUser(User user);

    void createVerificationTokenForUser(User user, String token);

    VerificationToken getVerificationToken(String VerificationToken);

    VerificationToken generateNewVerificationToken(String token);

    void createPasswordResetTokenForUser(User user, String token);

    User findUserByEmail(String email);

    PasswordResetToken getPasswordResetToken(String token);

    User getUserByPasswordResetToken(String token);

    User getUserByID(long id);

    void changeUserPassword(User user, String password);

    boolean checkIfValidOldPassword(User user, String password);

    String validateVerificationToken(String token);

    List<String> getUsersFromSessionRegistry();

}
