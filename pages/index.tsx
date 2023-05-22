import Image from "next/image";
import { Inter } from "next/font/google";
import logoUdeA from "@/images/logosimbolo-vertical.png";
import checkIcon from "@/images/check-svgrepo-com.svg";
import closeIcon from "@/images/close-bold-svgrepo-com.svg";
import capIcon from "@/images/cap-education-hat-svgrepo-com.svg";
import { useEffect, useState } from "react";
import { UserGraduationReqInfo } from "@/model/userGraduationReqInfo";
import { USER_MGS } from "@/Constants/graduationConts";
import useAxios from "@/hooks/UseAxios";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [userInfo, SetUserInfo] = useState<UserGraduationReqInfo>();
  const { error, sendRequest } = useAxios();

  const date = new Date().toLocaleDateString();

  useEffect(() => {
    sendRequest(
      "paz-y-salvos/validar-requisitos",
      {
        method: "post",
        data: {
          studentIdDoc: "123456",
        },
      },
      (response) => {
        console.log(response);
        if (response.status == 200) {
          SetUserInfo({ ...response.data });
          console.log("ready");
        }
      }
    );
  }, []);
  return (
    <>
      <div className="w-full h-full" id="container">
        <nav className="w-full min-h-[60px] bg-university-green" id="NavBarUS">
          {" "}
        </nav>
        <div className="w-full flex" id="contentContainer">
          <div id="welcomeMsg" className="w-[40%] min-h-[600px] panel-lateral">
            <div
              id="MSG"
              className="w-full mb-5 mt-[75px] px-10 text-university-green text-3xl font-bold px-auto "
            >
              {USER_MGS.WELCOME +
                (userInfo?.studentData?.name ?? "Joe Doe") +
                "!"}
            </div>
            <div
              id="mainMSG"
              className="w-full my-10 px-10 text-university-green text-2xl font-semibold px-auto"
            >
              {USER_MGS.REQUIREMENTS}
            </div>
            <div
              id="hopelessMSG"
              className="w-full mt-10 mb-5  px-10 text-university-green text-2xl font-semibold "
            >
              {USER_MGS.HOPELESS_SHIT}
            </div>
            <Image
              src={logoUdeA}
              alt={""}
              className="mx-auto max-w-[200px] mb-7"
            ></Image>
          </div>
          <div id="requirements" className="w-[60%] pl-5 min-h-600px">
            <div id="capLogo" className="w-full my-5">
              <Image
                src={capIcon}
                alt={"capIcon"}
                className="max-w-[100px]"
              ></Image>
            </div>
            <div id="requirementsInfo" className="my-4">
              <>
                <div id="reqTitle" className="font-bold text-xl">
                  {USER_MGS.REQUIREMENTS_INFO.TITLE}
                </div>
                <div id="reqDate" className="font-bold text-xl my-1">
                  <span className="font-bold text-xl">
                    {" " + USER_MGS.REQUIREMENTS_INFO.DATE}
                  </span>
                  <span className="font-semibold text-lg pl-1">{date}</span>
                </div>

                <div id="reqName" className=" mt-5 mb-1 flex">
                  <span className="font-bold text-xl">
                    {" " + USER_MGS.REQUIREMENTS_INFO.NAME}
                  </span>
                  <span className="font-semibold text-lg pl-1">
                    {(userInfo?.studentData?.name ?? "Joe Doe") + ""}
                  </span>
                </div>
                <div id="reqProgram" className="font-bold text-xl mb-4">
                  <span className="font-bold text-xl">
                    {" " + USER_MGS.REQUIREMENTS_INFO.PROGRAM}
                  </span>
                  <span className="font-semibold text-lg pl-1">
                    {"[" +
                      (userInfo?.studentData?.programCode ?? "00001") +
                      "]" +
                      " " +
                      (userInfo?.studentData?.program ?? "mamerto")}
                  </span>
                </div>
                <div id="reqProgram" className="font-bold text-xl mt-5">
                  {USER_MGS.REQUIREMENTS_INFO.REQUIREMENTS}
                </div>
              </>
              <div id="requirementsList" className="w-full mt-3">
                <div className="flex">
                  <div className=" my-3 min-h-[50px] w-[70%] boxes">
                    <div className=" py-2 max-h-[30px] text-white font-semibold text-xl text-center">
                      {USER_MGS.REQUIREMENTS_INFO.ASIG_OBL}
                    </div>
                  </div>
                  {userInfo?.materiasOb ? (
                    <div className="my-auto">
                      <Image
                        src={checkIcon}
                        alt={""}
                        className="max-w-[50px] ml-3 my-auto"
                      ></Image>
                    </div>
                  ) : (
                    <div className="my-auto">
                      <Image
                        src={closeIcon}
                        alt={""}
                        className="max-w-[50px] ml-3 my-auto"
                      ></Image>
                    </div>
                  )}
                </div>
                <div className="flex">
                  <div className=" my-3 min-h-[50px] w-[70%] boxes">
                    <div className=" py-2 max-h-[30px] text-white font-semibold text-xl text-center">
                      {USER_MGS.REQUIREMENTS_INFO.ASIG_ELEC}
                    </div>
                  </div>
                  {userInfo?.materiasElec ? (
                    <div className="my-auto">
                      <Image
                        src={checkIcon}
                        alt={""}
                        className="max-w-[50px] ml-3 my-auto"
                      ></Image>
                    </div>
                  ) : (
                    <div className="my-auto">
                      <Image
                        src={closeIcon}
                        alt={""}
                        className="max-w-[50px] ml-3 my-auto"
                      ></Image>
                    </div>
                  )}
                </div>
                <div className="flex">
                  <div className=" my-3 min-h-[50px] w-[70%] boxes">
                    <div className=" py-2 max-h-[30px] text-white font-semibold text-xl text-center">
                      {USER_MGS.REQUIREMENTS_INFO.ASIG_COUR}
                    </div>
                  </div>
                  {userInfo?.pendientesNotas ? (
                    <div className="my-auto">
                      <Image
                        src={checkIcon}
                        alt={""}
                        className="max-w-[50px] ml-3 my-auto"
                      ></Image>
                    </div>
                  ) : (
                    <div className="my-auto">
                      <Image
                        src={closeIcon}
                        alt={""}
                        className="max-w-[50px] ml-3 my-auto"
                      ></Image>
                    </div>
                  )}
                </div>
                <div className="flex">
                  <div className=" my-3 min-h-[50px] w-[70%] boxes">
                    <div className=" py-2 max-h-[30px] text-white font-semibold text-xl text-center">
                      {USER_MGS.REQUIREMENTS_INFO.OK_LIBRARY}
                    </div>
                  </div>
                  {userInfo?.biblioteca ? (
                    <div className="my-auto">
                      <Image
                        src={checkIcon}
                        alt={""}
                        className="max-w-[50px] ml-3 my-auto"
                      ></Image>
                    </div>
                  ) : (
                    <div className="my-auto">
                      <Image
                        src={closeIcon}
                        alt={""}
                        className="max-w-[50px] ml-3 my-auto"
                      ></Image>
                    </div>
                  )}
                </div>
                <div className="flex">
                  <div className=" my-3 min-h-[50px] w-[70%] boxes">
                    <div className=" py-2 max-h-[30px] text-white font-semibold text-xl text-center">
                      {USER_MGS.REQUIREMENTS_INFO.OK_TREASURY}
                    </div>
                  </div>
                  {userInfo?.cartera ? (
                    <div className="my-auto">
                      <Image
                        src={checkIcon}
                        alt={""}
                        className="max-w-[50px] ml-3 my-auto"
                      ></Image>
                    </div>
                  ) : (
                    <div className="my-auto">
                      <Image
                        src={closeIcon}
                        alt={""}
                        className="max-w-[50px] ml-3 my-auto"
                      ></Image>
                    </div>
                  )}
                </div>
                <div className="flex">
                  <div className=" my-3 min-h-[50px] w-[70%] boxes">
                    <div className=" py-2 max-h-[30px] text-white font-semibold text-xl text-center">
                      {USER_MGS.REQUIREMENTS_INFO.OK_FRA}
                    </div>
                  </div>
                  {userInfo?.impedimento ? (
                    <div className="my-auto">
                      <Image
                        src={checkIcon}
                        alt={""}
                        className="max-w-[50px] ml-3 my-auto"
                      ></Image>
                    </div>
                  ) : (
                    <div className="my-auto">
                      <Image
                        src={closeIcon}
                        alt={""}
                        className="max-w-[50px] ml-3 my-auto"
                      ></Image>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
