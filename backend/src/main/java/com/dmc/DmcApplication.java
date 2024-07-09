package com.dmc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

@SpringBootApplication
public class DmcApplication {

	public static void main(String[] args) {
		SpringApplication.run(DmcApplication.class, args);
	}

	@Bean
	public OpenAPI customOpenAPI() {
		return new OpenAPI()
				.info(new Info()
						.title("Deukhuri Multiple Campus")
						.version("1.0")
						.description("API documentation of Deukhuri Multiple Campus")
						.termsOfService("Terms of service")
						.contact(new io.swagger.v3.oas.models.info.Contact()
								.name("Dipendra Bhatta")
								.url("https://deukhurimultiplecampus.edu.np")
								.email("bhattadipen557@gmail.com"))
						.license(new io.swagger.v3.oas.models.info.License()
								.name("License of API")
								.url("API license URL")));
	}
}
