import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import stylesp from '../../../styles/professorInfo.module.css';
import styles from '../../../styles/components/SearchPage.module.css';
import { H2, H3, B1 } from '../../../components/ui/typography';
import { fetchDeptCourses } from '../../../actions';
import { cardColors } from '../../../data/colors';
import CourseTitleCard from '../../../components/CourseTitleCard';

export default function DepartmentCourses() {
  const router = useRouter();
  const { dept } = router.query;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDeptCourses(dept));
  }, []);
  const department = useSelector((reduxState) => reduxState.courses.deptCourses);

  if (!department) {
    dispatch(fetchDeptCourses(dept));
    return (
      <B1>Loading...</B1>
    );
  }

  console.log(department.department);
  return (
    <div className={stylesp.container}>
      <H2>{`${dept} Courses`}</H2>
      <H3>{`${department.department.name}`}</H3>
      <div className={styles.depts}>

        {department.courses ? department.courses.map((course, i) => (
          <CourseTitleCard course={course} color={cardColors[i % cardColors.length]} />
        )) : ''}
      </div>
    </div>
  );
}
