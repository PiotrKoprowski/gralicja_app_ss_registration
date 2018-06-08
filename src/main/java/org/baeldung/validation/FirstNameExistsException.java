package org.baeldung.validation;

@SuppressWarnings("serial")
public class FirstNameExistsException extends Throwable {

    public FirstNameExistsException(final String message) {
        super(message);
    }

}
