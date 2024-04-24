package com.krishna.sendresume.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;

@Entity
@Table(name = "hr_mail")
@Data
public class HrMail {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String hrMail;

    private boolean send;

    private Date DateOfSend;
}
