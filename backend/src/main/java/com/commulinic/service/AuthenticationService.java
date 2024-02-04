package com.commulinic.service;

import com.commulinic.entity.AuthenticationResponse;
import com.commulinic.entity.User;
import com.commulinic.exception.UserAlreadyExistsException;

public interface AuthenticationService {

    AuthenticationResponse login(User user);

    AuthenticationResponse register(User user) throws UserAlreadyExistsException;
}
