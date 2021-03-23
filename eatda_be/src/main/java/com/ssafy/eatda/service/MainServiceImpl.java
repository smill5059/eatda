package com.ssafy.eatda.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ssafy.eatda.repository.UserRepository;
import com.ssafy.eatda.vo.Schedule;

@Service
public class MainServiceImpl implements MainService {

  @Autowired
  private UserRepository userRepository;

  @Override
  public List<Schedule> getSchedules(int userSeq, Date requestDate) {

    // User user = userRepository.findBySeq(userSeq);
    // if (user == null)
    // return null;
    //
    // Calendar cal = Calendar.getInstance();
    // cal.setTime(requestDate);
    // int year = cal.get(Calendar.YEAR);
    // int month = cal.get(Calendar.MONTH);
    //
    ArrayList<Schedule> result = new ArrayList<Schedule>();
    //
    // for (Schedule s : user.getSchedules()) {
    // cal.setTime(s.getMeetDate());
    // if (cal.get(Calendar.YEAR) == year && cal.get(Calendar.MONTH) == month) {
    // result.add(s);
    // }
    // }
    //
    return result;
  }

}
