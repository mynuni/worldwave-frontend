import React, {useState} from 'react';
import styled from "styled-components";
import EmailStep from "./EmailStep";
import CodeStep from "./CodeStep";
import InfoStep from "./InfoStep";
import COLOR from "../../constants/color";

const SignUpForm = () => {

    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        passwordConfirm: "",
        nickname: "",
        ageRange: 10,
        gender: "",
        country: ""
    });

    const handleNextStep = () => setStep(step + 1);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    return (
        <>
            {step === 0 && <EmailStep formData={formData}
                                      onChange={handleInputChange}
                                      handleNextStep={handleNextStep}/>}
            {step === 1 && <CodeStep formData={formData}
                                     onChange={handleInputChange}
                                     handleNextStep={handleNextStep}/>}
            {step === 2 && <InfoStep formData={formData}
                                     setFormData={setFormData}
                                     onChange={handleInputChange}
                                     handleNextStep={handleNextStep}/>}
        </>
    );
};

export default SignUpForm;

export const sendButtonStyle = {
    width: "100%",
    height: "50px",
    backgroundColor: COLOR.BLUE,
    color: COLOR.WHITE,
}

export const InfoTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;