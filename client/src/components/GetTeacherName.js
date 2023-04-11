import styled from "styled-components";
import React from 'react';
import { useEffect } from "react";
import { useState } from "react";

const GetTeacherName = ({ teacher_id }) => {
    const [teachers, setTeachers] = useState();
    useEffect(() => {
        fetch(`/teachers/${teacher_id}`)
            .then(response => {
                return response.json();
            })
            .then(data => {

                setTeachers(data.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    return (
        teachers && (
            <Wrapper>
                {teachers.name}
            </Wrapper>
        )
    );
};
const Wrapper = styled.span`
    
`;

export default GetTeacherName;
