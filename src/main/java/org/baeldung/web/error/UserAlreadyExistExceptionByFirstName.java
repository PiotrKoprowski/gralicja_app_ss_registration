package org.baeldung.web.error;

public final class UserAlreadyExistExceptionByFirstName extends RuntimeException {

    private static final long serialVersionUID = 5861310537366287163L;

    public UserAlreadyExistExceptionByFirstName() {
        super();
    }

    public UserAlreadyExistExceptionByFirstName(final String message, final Throwable cause) {
        super(message, cause);
    }

    public UserAlreadyExistExceptionByFirstName(final String message) {
        super(message);
    }

    public UserAlreadyExistExceptionByFirstName(final Throwable cause) {
        super(cause);
    }

}
