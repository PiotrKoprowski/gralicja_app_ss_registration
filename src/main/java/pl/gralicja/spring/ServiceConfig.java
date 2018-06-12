package pl.gralicja.spring;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan({ "pl.gralicja.service" })
public class ServiceConfig {
}
