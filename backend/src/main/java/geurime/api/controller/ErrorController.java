package geurime.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.naming.AuthenticationException;
import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/error")
public class ErrorController {

    @GetMapping
    public void error(HttpServletRequest request) throws AuthenticationException {
        String message = (String) request.getAttribute("message");
        String exception = (String) request.getAttribute("exception");

        if ("AuthenticationException".equals(exception)) {
            throw new AuthenticationException(message);
        }
    }
}
