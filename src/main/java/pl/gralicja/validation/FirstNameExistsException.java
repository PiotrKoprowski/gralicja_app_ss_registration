package pl.gralicja.validation;

@SuppressWarnings("serial")
public class FirstNameExistsException extends Throwable {

    public FirstNameExistsException(final String message) {
        super(message);
    }

}
