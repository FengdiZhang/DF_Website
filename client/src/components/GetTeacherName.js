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
                <p>{teachers.name}</p>
            </Wrapper>
        )
    );
};
const Wrapper = styled.div`
    & p{
        font-size:20px;
        font-weight:bold;
        text-decoration:underline;
    }
`;

export default GetTeacherName;
