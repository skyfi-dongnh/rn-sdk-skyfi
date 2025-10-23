import { useEffect, useState } from "react";
import CheckoutService from "../services/api/checkout.api";

export const useCities = () => {
    const [cities, setCities] = useState<Array<Checkout.City>>([]);
    const getListCities = async () => {
        const response = await CheckoutService.getCities();
        return response.result.cities || [];
    };
    useEffect(() => {
        getListCities().then(setCities);
    }, []);
    return cities;
}

export const useDistricts = (city_id: number) => {
    const [districts, setDistricts] = useState<Array<Checkout.District>>([]);
    const [districtsView, setDistrictsView] = useState<Array<Checkout.District>>([]);

    useEffect(() => {
        const filteredDistricts = districts.filter(district => district.city_id === city_id);
        setDistrictsView(filteredDistricts);
    }, [city_id, districts]);

    const getListDistricts = async () => {
        const response = await CheckoutService.getDistricts();
        return response.result.districts || [];
    };
    useEffect(() => {
        getListDistricts().then(setDistricts);
    }, []);

    return districtsView;
}

export const useWards = (district_id: number) => {
    const [wards, setWards] = useState<Array<Checkout.Ward>>([]);
    const [wardsView, setWardsView] = useState<Array<Checkout.Ward>>([]);

    useEffect(() => {
        const filteredWards = wards.filter(ward => ward.district_id === district_id);
        setWardsView(filteredWards);
    }, [district_id, wards]);

    const getListWards = async () => {
        const response = await CheckoutService.getWards();
        return response.result.wards || [];
    };
    useEffect(() => {
        getListWards().then(setWards);
    }, []);

    return wardsView;
}
