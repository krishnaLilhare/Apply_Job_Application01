package com.krishna.sendresume.repository;

import com.krishna.sendresume.model.HrMail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HrMailRepository extends JpaRepository<HrMail,Integer> {
}
