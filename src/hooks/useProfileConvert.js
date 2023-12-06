import {COUNTRIES, COUNTRIES_KOREAN, COUNTRY} from "../constants/country";

const useCountryNameConvert = (code) => {
    const country = COUNTRIES.find((country) => country.code === code);
    return country ? country.label : '기타 국적';
};

const getKoreanLabel = (countryCode) => {
    const country = COUNTRIES_KOREAN.find(c => c.code === countryCode);
    return country ? country.label : '알 수 없음';
};

const getKorName = (code) => {
    const korName = COUNTRY.find(country => country.code === code);
    return korName && korName.korName;
};

const useGenderConvert = (gender) => {
    return gender === 'M' ? '남성' : gender === 'F' ? '여성' : '성별 비공개';
};

export {getKoreanLabel, getKorName, useCountryNameConvert, useGenderConvert};