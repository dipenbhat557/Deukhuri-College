package com.dmc.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Admission {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String first_name;

    private String middle_name = null;

    private String last_name;

    private String name_nep;

    private int province = 0;

    private int district = 0;

    private int municipality = 0;

    private int wardno;

    private String per_add;

    private String add_nep = null;

    private String tempadd;

    private String father_name;

    private String mother_name;

    private int marital_status;

    private int gender;

    private String dobe;

    private String dobn;

    private String phone;

    private String reg_date_n;

    private String photo=null;

    private String citiz_no = null;

    private String email;

    private String bloodgroup = null;

    private String religion;

    private int caste = 0;

    private int sub_caste = 0;

    private String nationality;

    private boolean bus_facility = false;

    private boolean dorm_facility = false;

    private String moth_ph = null;

    private String fath_ph = null;

    private int mother_qualification = 0;

    private int father_qualification = 0;

    private int branchid = 0;

    private int mem_cate_id = 0;

    private int std_profile = 0;

    private String username = null;

    private String password = null;

    private int destination = 0;

    private int sglsn = 0;

    private int saving_account_no = 0;

    private int program;

    private boolean account_off = false;

    private int branch_id = 0;

    private int acadmc_year;

    private int team = 0;

    private int year_semester;

    private int sec = 0;

    private int shift;

    private int medium;

    private String roll_no = null;

    private String reg_no = null;

    private String symbol_no = null;

    private int maj_subj = 0;

    private boolean sms_banking = false;

    private boolean notification = false;

    private String sms_mob_no = null;

    private String remarks = null;

    private int mem_cate = 1;
}
