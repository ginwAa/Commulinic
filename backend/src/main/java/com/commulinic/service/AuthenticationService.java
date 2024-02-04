package com.commulinic.service;

import com.commulinic.entity.AuthenticationResponse;
import com.commulinic.entity.User;

public interface AuthenticationService {

    AuthenticationResponse login(User user);

    AuthenticationResponse register(User user);

}
