import React, {useEffect, useRef, useState} from 'react';
import {CountryNameWrap, PageLayout, StyledWorldMap} from "./ExplorePage.styles";
import ExploreDetail from "../../components/Explore/ExploreDetail";
import {COUNTRIES} from "../../constants/country";
import ExploreInfoBar from "../../components/Explore/ExploreInfoBar";
import useModal from "../../hooks/useModal";
import {getKorName} from "../../hooks/useProfileConvert";

const ExplorePage = () => {
    const [code, setCode] = useState("");
    const [countryData, setCountryData] = useState({
        countryName: "",
        regionCode: ""
    });

    const providedCountries = COUNTRIES.map(country => country.code);

    const handleMouseOver = (e) => {
        const code = e.target.getAttribute("data-id");
        if (code) {
            setCode(code);
        } else {
            setCode("");
        }
    };

    const handleCountryClick = (e) => {
        const countryName = e.target.getAttribute("data-name");
        const regionCode = e.target.getAttribute("data-id");

        // 국가 코드가 서비스 중인 국가에 해당하지 않으면 경고 표시
        if (countryName && regionCode) {
            if (COUNTRIES.some(country => country.code === regionCode)) {
                setCountryData({
                    ...countryData,
                    countryName: countryName,
                    regionCode: regionCode
                });
                openModal();
            } else {
                alert("서비스 중인 국가가 아닙니다. \n서비스 중인 국가 목록을 확인해주세요.");
            }
        }
    };

    const mousePositionRef = useRef({x: 0, y: 0});
    const countrySpanRef = useRef(null);

    const handleMouseMove = (e) => {
        mousePositionRef.current = {x: e.clientX + 50, y: e.clientY - 60};
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    useEffect(() => {
        if (code !== null && countrySpanRef.current) {
            countrySpanRef.current.style.top = mousePositionRef.current.y + 'px';
            countrySpanRef.current.style.left = mousePositionRef.current.x + 'px';
        }
    }, [code]);

    const {Modal, isOpen, close, open: openModal} = useModal();

    return (
        <PageLayout>
            <ExploreInfoBar/>
            <StyledWorldMap
                onMouseOver={handleMouseOver}
                onClick={handleCountryClick}
                providedCountries={providedCountries}
            />
            <Modal>
                <ExploreDetail regionCode={countryData.regionCode} closeModal={close}/>
            </Modal>
            {code && getKorName(code) &&
                <CountryNameWrap style={{
                    top: mousePositionRef.current.y,
                    left: mousePositionRef.current.x
                }}>{getKorName(code)}</CountryNameWrap>
            }
        </PageLayout>
    );
};

export default ExplorePage;
