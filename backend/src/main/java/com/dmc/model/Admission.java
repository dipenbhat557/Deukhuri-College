package com.dmc.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Admission {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
    
        @JsonProperty("program")
        @NotNull
        private Integer program;
    
        @JsonProperty("acdmc_year")
        @NotNull
        private Integer acdmcYear;
    
        @JsonProperty("year_semester")
        @NotNull
        private Integer yearSemester;
    
        @JsonProperty("medium")
        @NotNull
        private Integer medium;
    
        @JsonProperty("sec")
        @NotNull
        private Integer sec;
    
        @JsonProperty("team")
        @NotNull
        private Integer team;
    
        @JsonProperty("shift")
        @NotNull
        private Integer shift;
    
        @JsonProperty("maj_subj")
        @NotNull
        private Integer majSubj;
    
        @JsonProperty("first_name")
        @NotBlank
        private String firstName;
    
        @JsonProperty("middle_name")
        @NotBlank
        private String middleName;
    
        @JsonProperty("last_name")
        @NotBlank
        private String lastName;
    
        @JsonProperty("name_nep")
        @NotBlank
        private String nameNep;
    
        @JsonProperty("dobn")
        @NotBlank
        private String dobn;
    
        @JsonProperty("phone")
        @NotBlank
        private String phone;
    
        @JsonProperty("email")
        @NotBlank
        private String email;
    
        @JsonProperty("marital_status")
        @NotNull
        private Integer maritalStatus;
    
        @JsonProperty("gender")
        @NotNull
        private Integer gender;
    
        @JsonProperty("sub_caste")
        @NotNull
        private Integer subCaste;
    
        @JsonProperty("caste")
        @NotNull
        private Integer caste;
    
        @JsonProperty("bloodgroup")
        @NotBlank
        private String bloodgroup;
    
        @JsonProperty("citiz_no")
        @NotBlank
        private String citizNo;
    
        @JsonProperty("religion")
        @NotBlank
        private String religion;
    
        @JsonProperty("nationality")
        @NotBlank
        private String nationality;
    
        @JsonProperty("province")
        @NotNull
        private Integer province;
    
        @JsonProperty("district")
        @NotNull
        private Integer district;
    
        @JsonProperty("municipality")
        @NotNull
        private Integer municipality;
    
        @JsonProperty("wardno")
        @NotNull
        private Integer wardno;
    
        @JsonProperty("add_nep")
        @NotBlank
        private String addNep;
    
        @JsonProperty("tempadd")
        @NotBlank
        private String tempadd;
    
        @JsonProperty("sms_mob_no")
        @NotBlank
        private String smsMobNo;
    
        @JsonProperty("dorm_facility")
        private Boolean dormFacility;
    
        @JsonProperty("bus_facility")
        private Boolean busFacility;
    
        @JsonProperty("father_name")
        @NotBlank
        private String fatherName;
    
        @JsonProperty("fath_ph")
        @NotBlank
        private String fathPh;
    
        @JsonProperty("father_qualification")
        @NotNull
        private Integer fatherQualification;
    
        @JsonProperty("mother_name")
        @NotBlank
        private String motherName;
    
        @JsonProperty("moth_ph")
        @NotBlank
        private String mothPh;
    
        @JsonProperty("mother_qualification")
        @NotNull
        private Integer motherQualification;
    
}
