package com.commulinic.service;

import com.commulinic.entity.User;
import com.commulinic.entity.auth.AuthenticationResponse;

public interface AuthenticationService {

    AuthenticationResponse login(User user);

    AuthenticationResponse register(User user);

}
