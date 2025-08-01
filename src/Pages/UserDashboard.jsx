import React, { useEffect, useState } from "react";
import Dashboard from "@mui/icons-material/Dashboard";
import People from "@mui/icons-material/People";
import DirectionsCar from "@mui/icons-material/DirectionsCar";
import ElectricCar from "@mui/icons-material/ElectricCarOutlined";
import CarRental from "@mui/icons-material/CarRentalTwoTone";
import Board from "@mui/icons-material/DepartureBoardTwoTone";
import History from "@mui/icons-material/HistoryToggleOffRounded";
import { useAddCarsMutation, useDeleteHistoryMutation, useFreezeAndActiveMutation, useGetAllCarsQuery, useGetAllUsersQuery, useGetHistoryQuery } from "../features/api/apiSlice";
import { AreaChart, XAxis, YAxis, Tooltip, CartesianGrid, Area } from "recharts";
import { Circle, Line } from "rc-progress";
import "./sty.css";

const UserDashboard = () => {
  //rtk query methods
  const [addCarData, carAddResponse] = useAddCarsMutation();
  const [freezeData] = useFreezeAndActiveMutation();
  const { data: getUserResponse } = useGetAllUsersQuery();
  const { data: allCarsData } = useGetAllCarsQuery({ type: "admin" });
  const { data: historyData } = useGetHistoryQuery();
  const [deleteHistoryData] = useDeleteHistoryMutation();
  const [previewUrl, setPreviewUrl] = useState(null);

  //customers data
  const [customersData, setCustomersData] = useState("");
  useEffect(() => {
    if (getUserResponse) {
      setCustomersData(getUserResponse);
    }
  }, [getUserResponse]);

  //total cars data
  const [allCars, setAllCars] = useState("");
  useEffect(() => {
    setAllCars(allCarsData);
  }, [allCarsData]);

  //rented cars data
  const [rentalHistoryData, setRentalHistoryData] = useState("");
  useEffect(() => {
    setRentalHistoryData(historyData);
  }, [historyData]);

  //modal variables
  const [dashboard, setDashboard] = useState(true);
  const [customers, setCustomers] = useState(false);
  const [addCar, setAddCar] = useState(false);
  const [totalCars, setTotalCars] = useState(false);
  const [rentedCarsContainer, setRentedCarsContainer] = useState(false);
  const [rentalHistoryContainer, setRentalHistoryContainer] = useState(false);

  //car form variables
  const [carPhoto, setCarPhoto] = useState("");
  const [model, setModel] = useState("");
  const [mark, setMark] = useState("");
  const [price, setPrice] = useState();
  const [ac, setAc] = useState("");
  const [door, setDoor] = useState("");
  const [transmission, setTransmission] = useState("");
  const [fuel, setFuel] = useState("");
  const [year, setYear] = useState("");

  // car photo handler
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setCarPhoto(file);

    // Generate a URL for the selected file
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  //add car handler
  const addCarHandler = () => {
    const form = new FormData();
    form.append("carPhoto", carPhoto);
    form.append("model", model);
    form.append("mark", mark);
    form.append("price", price);
    form.append("ac", ac);
    form.append("door", door);
    form.append("transmission", transmission);
    form.append("fuel", fuel);
    form.append("year", year);
    form.append("token", localStorage.getItem("jwt"));
    addCarData(form);
  };

  //freeze handler
  const freezeHandler = (id, action, type) => {
    freezeData({
      token: localStorage.getItem("jwt"),
      id,
      action,
      type,
    });
  };

  //Delete handler
  const deleteHistory = (id) => {
    deleteHistoryData({
      token: localStorage.getItem("jwt"),
      id,
    });
  };

  //sidebar handler
  const pathHandler = (val) => {
    setAddCar(false);
    setCustomers(false);
    setDashboard(false);
    setTotalCars(false);
    setRentedCarsContainer(false);
    setRentalHistoryContainer(false);
    switch (val) {
      case "add": {
        setAddCar(true);
        break;
      }
      case "customer": {
        setCustomers(true);
        break;
      }
      case "dashboard": {
        setDashboard(true);
        break;
      }
      case "totalCar": {
        setTotalCars(true);
        break;
      }
      case "rentedCar": {
        setRentedCarsContainer(true);
        break;
      }
      case "rentalHistory": {
        setRentalHistoryContainer(true);
        break;
      }
      default: {
        setDashboard(true);
        break;
      }
    }
  };
  let dataCharts = [
    {
      name: "March",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "April",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "May",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "June",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "July",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "August",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <>
      <div className="relative top-36 bg-white flex w-[1300px] h-[600px] items-center justify-center">
        <div className="flex w-[100%] h-[100%]">
          <div className="h-[100%] px-6 py-4 flex flex-col flex-[20%]  ml-0 bg-white shadow-3xl shadow-black">
            <div className="text-gray-800">
              <p className="text-xl font-extrabold text-gray-500">Welcome To Your Control Room</p>
              <p className="text-lg font-bold text-gray-500 py-1 mt-8 ">MAIN</p>
              <p onClick={() => pathHandler("dashboard")} className="text-xl text-[#ff4d30] font-extrabold hover:cursor-pointer hover:text-[#ff4d30]">
                <Dashboard /> <span className="text-gray-500 ml-1 hover:text-[#ff4d30]">Dashboard</span>
              </p>
            </div>
            <div className="text-gray-800 flex flex-col gap-2 mt-4 text-xl font-extrabold">
              <p className="text-lg font-bold text-gray-500 py-1 mt-5">LISTS</p>
              <p onClick={() => pathHandler("customer")} className="hover:text-[#ff4d30] text-[#ff4d30] cursor-pointer">
                <People /> <span className="text-gray-500 ml-2 hover:text-[#ff4d30]">Customers</span>
              </p>
              <p onClick={() => pathHandler("totalCar")} className="text-[#ff4d30] cursor-pointer">
                <ElectricCar /> <span className="text-gray-500 ml-2 hover:text-[#ff4d30]">Total Cars</span>
              </p>
              <p onClick={() => pathHandler("rentedCar")} className="text-[#ff4d30] cursor-pointer">
                <CarRental /> <span className="text-gray-500 ml-2 hover:text-[#ff4d30]">Rented Cars</span>
              </p>
              <p onClick={() => pathHandler("add")} className="text-[#ff4d30] cursor-pointer">
                <Board /> <span className="text-gray-500 ml-2 hover:text-[#ff4d30]">Add Car</span>
              </p>
              <p onClick={() => pathHandler("rentalHistory")} className="text-[#ff4d30] cursor-pointer">
                <History /> <span className="text-gray-500 ml-2 hover:text-[#ff4d30]">Rental History</span>
              </p>
            </div>
          </div>{" "}
          {/* ################################################################################# */}
          <div className="h-[100%] px-8 py-4 flex items-center flex-col flex-[100%] top-0 bg-gray-200">
            {/* ____________________________________________________________________________________ */}
            {dashboard && (
              <div className="flex relative flex-col items-center justify-center h-[30%] w-[90%] gap-16 ">
                <div className="flex w-[100%] -mt-10 h-auto items-start justify-center gap-28">
                  <div className="flex shadow-2xl text-lg h-40 w-80 px-4 items-center justify-center  rounded-xl py-2 bg-white">
                    <img src="./customers.png" alt="car" className="h-20 rounded-full w-32" />
                    <div className="flex items-center justify-center flex-col gap-4">
                      <p className="text-2xl text-gray-600 font-extrabold">Customers</p>
                      <p className="text-4xl text-[#00aeff] font-extrabold">{customersData ? customersData.length : 0} </p>
                    </div>
                  </div>
                  <div className="flex shadow-2xl text-lg h-40 w-80 px-4 items-center justify-center  rounded-xl py-2 bg-white">
                    <img src="./cars.png" alt="car" className="h-20 rounded-full w-32" />
                    <div className="flex items-center justify-center flex-col gap-4">
                      <p className="text-2xl text-gray-600 font-extrabold">Total Cars</p>
                      <p className="text-4xl text-[#00aeff] font-extrabold">{allCarsData ? allCarsData.length : 0} </p>
                    </div>
                  </div>{" "}
                  <div className="flex shadow-2xl text-lg h-40 w-80 px-4 items-center justify-center  rounded-xl py-2 bg-white">
                    <img src="./rents.png" alt="car" className="h-20 rounded-full w-32" />
                    <div className="flex items-center justify-center flex-col gap-4">
                      <p className="text-xl text-gray-600 font-extrabold">Rented Cars</p>
                      <p className="text-4xl text-[#00aeff] font-extrabold">{allCarsData ? allCarsData.filter((e) => e.status === "Taken").length : 0} </p>
                    </div>
                  </div>{" "}
                  <div className="flex shadow-2xl text-lg h-40 w-80 px-4 items-center justify-center  rounded-xl py-2 bg-white">
                    <img src="./history.png" alt="car" className="h-20 rounded-full w-32" />
                    <div className="flex items-center justify-center flex-col gap-4">
                      <p className="text-2xl text-gray-600 font-extrabold">History</p>
                      <p className="text-4xl text-[#00aeff] font-extrabold">{rentalHistoryData ? rentalHistoryData.length : 0} </p>
                    </div>
                  </div>
                </div>
                <div className="w-[100%] flex gap-14  absolute top-56 h-auto">
                  <div className="flex py-10 border border-gray-100 bg-white shadow-xl text-gray-500 relative flex-[50%] items-center rounded-lg  justify-center">
                    <p className="absolute w-[100%] top-2 left-3 text-2xl font-bold">Total Revenue</p>
                    <div className="relative items-center gap-4 mt-2 justify-center flex flex-col w-[50%] h-auto">
                      <Circle strokeWidth={3} percent={80} />
                      <p className="text-4xl text-[#00aeff] absolute top-[20%] left-[35%] font-extrabold">80 %</p>
                      <p className=" text-gray-500 text-2xl w-[130%] font-bold">Total Rents Made Today</p>
                      <p className="text-4xl text-[#00aeff] font-extrabold">$ 210</p>
                      <p className="text-xl w-[150%]">
                        Previous Transactions Proceed.Last <br /> payments may not included.
                      </p>
                      <div className="flex justify-between w-[170%]">
                        <div className="flex items-center w-[100%] justify-center flex-col">
                          <p className="text-xl text-center flex font-bold text-gray-500">Target</p>
                          <p className="text-xl text-center flex font-bold text-red-500">$ 2500</p>
                        </div>
                        <div className="flex items-center w-[100%] justify-center flex-col">
                          <p className="text-xl text-center flex font-bold text-gray-500">Last Weak</p>
                          <p className="text-xl text-center flex font-bold text-[#00aeff]">$ 432</p>
                        </div>
                        <div className="flex items-center w-[100%] justify-center flex-col">
                          <p className="text-xl text-center flex font-bold text-gray-500">Last Month</p>
                          <p className="text-xl text-center flex font-bold text-[#00aeff]">$ 1423</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col flex-[100%] bg-white rounded-lg">
                    <p className="text-3xl text-gray-500 font-extrabold py-4 px-10">Last 6 Month Revenue</p>
                    <AreaChart width={600} height={300} data={dataCharts} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ff4d30" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#ff4d30" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#00aeff" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#00aeff" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Area type="monotone" dataKey="uv" stroke="#ff4d30" fillOpacity={1} fill="url(#colorUv)" />
                      <Area type="monotone" dataKey="pv" stroke="#ff4d30" fillOpacity={1} fill="url(#colorPv)" />
                    </AreaChart>
                  </div>
                </div>
              </div>
            )}
            {/* _____________________________________________________________________________________ */}
            {customers && (
            // <div className="w-full bg-white text-lg font-semibold text-gray-700 h-full mt-10 flex justify-center">
                <div className="bg-white w-full text-lg font-semibold tex-gray-700 shadow-lg rounded-lg overflow-hidden w-[90%]">
                <table className="min-w-full leading-normal">
                    <thead>
                    <tr className="bg-gradient-to-r from-[#ff4d30] to-[#ff4d30] text-white">
                        <th className="px-6 py-4 border-b-2 border-gray-200 text-left text-base uppercase tracking-wider">No</th>
                        <th className="px-6 py-4 border-b-2 border-gray-200 text-left text-base uppercase tracking-wider">Profile</th>
                        <th className="px-6 py-4 border-b-2 border-gray-200 text-left text-base uppercase tracking-wider">First Name</th>
                        <th className="px-6 py-4 border-b-2 border-gray-200 text-left text-base uppercase tracking-wider">Last Name</th>
                        <th className="px-6 py-4 border-b-2 border-gray-200 text-left text-base uppercase tracking-wider">Email</th>
                        <th className="px-6 py-4 border-b-2 border-gray-200 text-left text-base uppercase tracking-wider">Phone</th>
                        <th className="px-6 py-4 border-b-2 border-gray-200 text-left text-base uppercase tracking-wider">Address</th>
                    </tr>
                    </thead>
                    <tbody>
                    {customersData &&
                        customersData.map((cus, i) => (
                        <tr key={cus._id} className="hover:bg-gray-100 transition duration-150 ease-in-out">
                            <td className="px-6 py-5 border-b border-gray-200 text-base">{i + 1}</td>
                            <td className="px-6 py-5 border-b border-gray-200 text-base">
                            <img
                                src={`http://localhost:5000/${cus.profilePic}`}
                                alt="customer"
                                className="h-14 w-14 rounded-full border-2 border-gray-300 object-cover"
                            />
                            </td>
                            <td className="px-6 py-5 border-b border-gray-200 text-base">{cus.firstName}</td>
                            <td className="px-6 py-5 border-b border-gray-200 text-base">{cus.lastName}</td>
                            <td className="px-6 py-5 border-b border-gray-200 text-base">{cus.email}</td>
                            <td className="px-6 py-5 border-b border-gray-200 text-base">{cus.phone}</td>
                            <td className="px-6 py-5 border-b border-gray-200 text-base">{cus.address}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            // </div>
            )}

            {/* _____________________________________________________________________________________ */}
            {addCar && (
            <div className="w-[90%] h-[98%] items-center justify-start flex flex-col bg-white px-8 py-12 shadow-lg rounded-lg">
                <div className="flex relative flex-col items-center justify-center bg-white w-[70%] h-auto">
                <p className="text-4xl font-extrabold flex items-center justify-center text-gray-700 bg-white w-full mb-8 uppercase">Car Information</p>
                <div className="relative w-full">
                  <input
                    onChange={handlePhotoChange}
                    className="absolute inset-0 w-full h-16 opacity-0 cursor-pointer"
                    type="file"
                    name="carPhoto"
                    accept="image/*"
                  />
                  <p className="h-16 text-lg flex items-center text-[#ff4d30] font-semibold mt-4 w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none cursor-pointer">
                    <DirectionsCar className="mr-2" />{" "}
                    <span className="text-gray-600">Choose Car Photo</span>
                  </p>
                  {previewUrl && (
                    <div className="mt-4">
                      <img
                        src={previewUrl}
                        alt="Car Preview"
                        className="w-full h-auto max-h-64 object-contain border border-gray-300 rounded-lg shadow-md"
                      />
                    </div>
                  )}
                  </div>

                {/* Grouping fields in two columns */}
                <div className="w-full flex flex-wrap gap-4 mt-6">
                    <input
                    onChange={(e) => setPrice(e.target.value)}
                    className="flex-1 h-16 text-lg font-semibold px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-[#ff4d30]"
                    type="number"
                    placeholder="Price / day"
                    />
                    <input
                    onChange={(e) => setModel(e.target.value)}
                    className="flex-1 h-16 text-lg font-semibold px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-[#ff4d30]"
                    type="text"
                    placeholder="Model"
                    />
                </div>

                <div className="w-full flex flex-wrap gap-4 mt-4">
                    <input
                    onChange={(e) => setMark(e.target.value)}
                    className="flex-1 h-16 text-lg font-semibold px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-[#ff4d30]"
                    type="text"
                    placeholder="Mark"
                    />
                    <input
                    onChange={(e) => setYear(e.target.value)}
                    className="flex-1 h-16 text-lg font-semibold px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-[#ff4d30]"
                    type="text"
                    placeholder="Year"
                    />
                </div>

                <div className="w-full flex flex-wrap gap-4 mt-4">
                    <input
                    onChange={(e) => setDoor(e.target.value)}
                    className="flex-1 h-16 text-lg font-semibold px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-[#ff4d30]"
                    type="text"
                    placeholder="Door"
                    />
                    <input
                    onChange={(e) => setAc(e.target.value)}
                    className="flex-1 h-16 text-lg font-semibold px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-[#ff4d30]"
                    type="text"
                    placeholder="AC"
                    />
                </div>

                <div className="w-full flex flex-wrap gap-4 mt-4">
                    <input
                    onChange={(e) => setTransmission(e.target.value)}
                    className="flex-1 h-16 text-lg font-semibold px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-[#ff4d30]"
                    type="text"
                    placeholder="Transmission"
                    />
                    <input
                    onChange={(e) => setFuel(e.target.value)}
                    className="flex-1 h-16 text-lg font-semibold px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-[#ff4d30]"
                    type="text"
                    placeholder="Fuel"
                    />
                </div>

                <button
                    onClick={addCarHandler}
                    className="h-14 rounded-lg text-xl hover:bg-[#e0432b] mt-6 w-full px-6 bg-[#ff4d30] text-white font-extrabold transition-colors duration-200"
                >
                    Add Car
                </button>
                </div>
                {carAddResponse?.data?.message && (
                <div className="absolute shadow-lg shadow-emerald-500 z-30 top-72 right-10 border bg-white px-4 py-2 rounded-lg border-emerald-500 text-emerald-500 font-bold text-lg">
                    {carAddResponse.data.message}
                </div>
                )}
                {carAddResponse?.status === "rejected" && (
                <div className="absolute shadow-lg shadow-[#ff4d30] z-30 top-72 right-10 border bg-white px-4 py-2 rounded-lg border-[#ff4d30] text-[#ff4d30] font-bold text-lg">
                    {carAddResponse.error.data}
                </div>
                )}
            </div>
            )}

            {/* ____________________________________________________________________________________ */}
            {totalCars && (
            <div className="bg-white w-full text-lg font-semibold tex-gray-700 shadow-lg rounded-lg overflow-hidden w-[90%]">
                <table className="min-w-full leading-normal shadow-lg rounded-lg">
                <thead>
                    <tr className="bg-gradient-to-r from-[#ff4d30] to-[#ff4d30] text-white">
                    <th className="px-6 py-4 border-b-2 border-gray-200 text-left text-base uppercase tracking-wider">No</th>
                    <th className="px-6 py-4 border-b-2 border-gray-200 text-left text-base uppercase tracking-wider">Photo</th>
                    <th className="px-6 py-4 border-b-2 border-gray-200 text-left text-base uppercase tracking-wider">Model</th>
                    <th className="px-6 py-4 border-b-2 border-gray-200 text-left text-base uppercase tracking-wider">Mark</th>
                    <th className="px-6 py-4 border-b-2 border-gray-200 text-left text-base uppercase tracking-wider">Price</th>
                    <th className="px-6 py-4 border-b-2 border-gray-200 text-left text-base uppercase tracking-wider">Ac</th>
                    <th className="px-6 py-4 border-b-2 border-gray-200 text-left text-base uppercase tracking-wider">Door</th>
                    <th className="px-6 py-4 border-b-2 border-gray-200 text-left text-base uppercase tracking-wider">Transmission</th>
                    <th className="px-6 py-4 border-b-2 border-gray-200 text-left text-base uppercase tracking-wider">Fuel</th>
                    <th className="px-6 py-4 border-b-2 border-gray-200 text-left text-base uppercase tracking-wider">Active</th>
                    <th className="px-6 py-4 border-b-2 border-gray-200 text-left text-base uppercase tracking-wider">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {allCars &&
                    allCars.map((car, i) => {
                        return (
                        <tr key={car._id} className="odd:bg-white even:bg-gray-50 hover:bg-gray-200 transition duration-150">
                            <td className="px-6 py-5 border-b border-gray-200 text-base">{i + 1}</td>
                            <td className="px-6 py-5 border-b border-gray-200 text-base">
                            <img src={`http://localhost:5000/uploads/${car.carPhoto}`} alt="car" className="h-14 w-14 rounded-full border-2 border-gray-300 object-cover shadow-md" />
                            </td>
                            <td className="px-6 py-5 border-b border-gray-200 text-base">{car.model}</td>
                            <td className="px-6 py-5 border-b border-gray-200 text-base">{car.mark}</td>
                            <td className="px-6 py-5 border-b border-gray-200 text-base">{car.price}</td>
                            <td className="px-6 py-5 border-b border-gray-200 text-base">{car.ac ? "Yes" : "No"}</td>
                            <td className="px-6 py-5 border-b border-gray-200 text-base">{car.door}</td>
                            <td className="px-6 py-5 border-b border-gray-200 text-base">{car.transmission}</td>
                            <td className="px-6 py-5 border-b border-gray-200 text-base">{car.fuel}</td>
                            <td className={`px-6 py-5 border-b border-gray-200 text-base font-extrabold ${car.active ? "text-emerald-600" : "text-red-500"}`}>{car.active ? "Yes" : "No"}</td>
                            <td className="px-6 py-5 border-b border-gray-200 text-base">
                            {car.active ? (
                                <button
                                onClick={() => freezeHandler(car._id, "remove", "HIDE_CAR")}
                                className="py-2 px-4 bg-[#ff4d30] text-white font-bold rounded-md hover:scale-105 hover:bg-[#e0432b] duration-150"
                                >
                                Hide
                                </button>
                            ) : (
                                <button
                                onClick={() => freezeHandler(car._id, "release", "SHOW_CAR")}
                                className="py-2 px-4 bg-emerald-500 text-white font-bold rounded-md hover:scale-105 duration-150"
                                >
                                Show
                                </button>
                            )}
                            </td>
                        </tr>
                        );
                    })}
                </tbody>
                </table>
            </div>
            )}

            {/* ___________________________________________________________________________________ */}
            {rentedCarsContainer && (
              <div className="bg-white w-full text-lg font-semibold tex-gray-700 shadow-lg rounded-lg overflow-hidden w-[90%]">
                <table className="min-w-full leading-normal shadow-lg rounded-lg">
                <tr className="bg-gradient-to-r from-[#ff4d30] to-[#ff4d30] text-white">
                    <th className="px-6 py-4 border-b-2 border-gray-200 text-left text-base uppercase tracking-wider">No</th>
                    <th className="px-6 py-4 border-b-2 border-gray-200 text-left text-base uppercase tracking-wider">Photo</th>
                    <th className="px-6 py-4 border-b-2 border-gray-200 text-left text-base uppercase tracking-wider">Model</th>
                    <th className="px-6 py-4 border-b-2 border-gray-200 text-left text-base uppercase tracking-wider">Mark</th>
                    <th className="px-6 py-4 border-b-2 border-gray-200 text-left text-base uppercase tracking-wider">Price</th>
                    <th className="px-6 py-4 border-b-2 border-gray-200 text-left text-base uppercase tracking-wider">Ac</th>
                    <th className="px-6 py-4 border-b-2 border-gray-200 text-left text-base uppercase tracking-wider">Door</th>
                    <th className="px-6 py-4 border-b-2 border-gray-200 text-left text-base uppercase tracking-wider">Transmission</th>
                    <th className="px-6 py-4 border-b-2 border-gray-200 text-left text-base uppercase tracking-wider">Fuel</th>
                    <th className="px-6 py-4 border-b-2 border-gray-200 text-left text-base uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 border-b-2 border-gray-200 text-left text-base uppercase tracking-wider">Action</th>
                  </tr>
                  {allCars &&
                    allCars.map((car, i) => {
                      return (
                        <tr key={car._id} className="mt-4 border text-gray-600  border-gray-400">
                          <td className="px-6 py-5 border-b border-gray-200 text-base">{i + 1}</td>
                          <td className="px-6 py-5 border-b border-gray-200 text-base">
                            <img src={`http://localhost:5000/uploads/${car.carPhoto}`} alt="rented cars" className="h-14 w-14 rounded-full border-2 border-gray-300 object-cover shadow-md" />
                          </td>
                          <td className="px-6 py-5 border-b border-gray-200 text-base">{car.model}</td>
                          <td className="px-6 py-5 border-b border-gray-200 text-base">{car.mark}</td>
                          <td className="px-6 py-5 border-b border-gray-200 text-base">{car.price}</td>
                          <td className="px-6 py-5 border-b border-gray-200 text-base">{car.ac}</td>
                          <td className="px-6 py-5 border-b border-gray-200 text-base">{car.door}</td>
                          <td className="px-6 py-5 border-b border-gray-200 text-base">{car.transmission}</td>
                          <td className="px-6 py-5 border-b border-gray-200 text-base">{car.fuel}</td>
                          <td className="px-6 py-5 border-b border-gray-200 text-base uppercase">{car.status}</td>
                          {car.status === "Taken" && (
                            <td className="px-6 py-5 border-b border-gray-200 text-base">
                              <button
                                onClick={() => freezeHandler(car._id, "release", "RELEASE_CAR")}
                                className="py-2 px-2 bg-emerald-500 text-white font-bold rounded-md hover:scale-105 duration-150"
                              >
                                Release
                              </button>
                            </td>
                          )}
                          {car.status === "available" && <td className="w-44 text-lg h-16 pl-12">Ready For Rent</td>}
                        </tr>
                      );
                    })}
                </table>
              </div>
            )}
            {/* _____________________________________________________________________________________ */}
            {rentalHistoryContainer && (
              <div className="bg-white w-full text-lg font-semibold tex-gray-700 shadow-lg rounded-lg overflow-hidden w-[90%]">
                <table className="min-w-full leading-normal shadow-lg rounded-lg">
                <tr className="bg-gradient-to-r from-[#ff4d30] to-[#ff4d30] text-white">
                    <th className="px-6 py-4 border-b-2 border-gray-200 text-left text-base uppercase tracking-wider">No</th>
                    <th className="px-6 py-4 border-b-2 border-gray-200 text-left text-base uppercase tracking-wider">Profile</th>
                    <th className="px-6 py-4 border-b-2 border-gray-200 text-left text-base uppercase tracking-wider">First Name</th>
                    <th className="px-6 py-4 border-b-2 border-gray-200 text-left text-base uppercase tracking-wider">Last Name</th>
                    <th className="px-6 py-4 border-b-2 border-gray-200 text-left text-base uppercase tracking-wider">Email</th>
                    <th className="px-6 py-4 border-b-2 border-gray-200 text-left text-base uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-4 border-b-2 border-gray-200 text-left text-base uppercase tracking-wider">Address</th>
                    <th className="px-6 py-4 border-b-2 border-gray-200 text-left text-base uppercase tracking-wider">Photo</th>
                    <th className="px-6 py-4 border-b-2 border-gray-200 text-left text-base uppercase tracking-wider">Model</th>
                    <th className="px-6 py-4 border-b-2 border-gray-200 text-left text-base uppercase tracking-wider">Mark</th>
                    <th className="px-6 py-4 border-b-2 border-gray-200 text-left text-base uppercase tracking-wider">Price</th>
                    <th className="px-6 py-4 border-b-2 border-gray-200 text-left text-base uppercase tracking-wider">Pick Date</th>
                    <th className="px-6 py-4 border-b-2 border-gray-200 text-left text-base uppercase tracking-wider">Pick Time</th>
                    <th className="px-6 py-4 border-b-2 border-gray-200 text-left text-base uppercase tracking-wider">Drop Date</th>
                    <th className="px-6 py-4 border-b-2 border-gray-200 text-left text-base uppercase tracking-wider">Drop Time</th>
                    <th className="px-6 py-4 border-b-2 border-gray-200 text-left text-base uppercase tracking-wider">Action</th>
                  </tr>
                  {rentalHistoryData &&
                    rentalHistoryData.map((history, i) => {
                      return (
                        <tr key={history._id} className="mt-4 border text-gray-600  border-gray-400">
                          <td className="px-6 py-5 border-b border-gray-200 text-base">{i + 1}</td>
                          <td className="px-6 py-5 border-b border-gray-200 text-base">
                            <img src={`http://localhost:5000/${history.profilePic}`} alt="cartomer" className="-14 w-14 rounded-full border-2 border-gray-300 object-cover shadow-md" />
                          </td>
                          <td className="px-6 py-5 border-b border-gray-200 text-base">{history.firstName}</td>
                          <td className="px-6 py-5 border-b border-gray-200 text-base">{history.lastName}</td>
                          <td className="px-6 py-5 border-b border-gray-200 text-base">{history.email}</td>
                          <td className="px-6 py-5 border-b border-gray-200 text-base">{history.phone}</td>
                          <td className="px-6 py-5 border-b border-gray-200 text-base">{history.address}</td>
                          <td className="px-6 py-5 border-b border-gray-200 text-base">
                            <img src={`http://localhost:5000/uploads/${history.carPhoto}`} alt="cartomer" className="h-8 w-8 rounded-full" />
                          </td>
                          <td className="px-6 py-5 border-b border-gray-200 text-base">{history.model}</td>
                          <td className="px-6 py-5 border-b border-gray-200 text-base">{history.mark}</td>
                          <td className="px-6 py-5 border-b border-gray-200 text-base">$ {history.price}</td>
                          <td className="px-6 py-5 border-b border-gray-200 text-base">{history.pickDate}</td>
                          <td className="px-6 py-5 border-b border-gray-200 text-base">{history.pickTime}</td>
                          <td className="px-6 py-5 border-b border-gray-200 text-base">{history.dropDate}</td>
                          <td className="px-6 py-5 border-b border-gray-200 text-base">{history.dropTime}</td>
                          <td className="px-6 py-5 border-b border-gray-200 text-base">
                            <button onClick={() => deleteHistory(history._id)} className="py-2 px-2 bg-[#ff4d30] text-white font-bold rounded-md hover:scale-105 duration-150">
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
