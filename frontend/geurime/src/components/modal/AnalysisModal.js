/*
분석결과 모달
@author 조혜안
@since 2022.11.02
*/
import Button from "components/common/Btn.js";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useNavigate } from "react-router-dom";
import { Container, DialogTitle } from "@mui/material";
// import Chart from "react-apexcharts";
import { ResponsivePie } from "@nivo/pie";
import { useState, useEffect } from "react";

const Piechart = ({ happy, sad, angry }) => {
  const handle = {
    padClick: (data) => {
      console.log(data);
    },

    legendClick: (data) => {
      console.log(data);
    },
  };

  return (
    <div style={{ width: "300px", height: "300px", margin: "0 auto" }}>
      <ResponsivePie
        data={[
          { id: "행복😆", value: happy },
          { id: "우울😥", value: sad },
          { id: "폭력😡", value: angry },
        ]}
        margin={{ right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={1.8}
        cornerRadius={8}
        colors={["#A9D5C7", "#F7BF87", "#FFB3B3"]} // 커스터하여 사용할 때
        // colors={{ scheme: "pastel1" }} // nivo에서 제공해주는 색상 조합 사용할 때
        // borderWidth={2}
        arcLabel={(d) => `${(d.value * 100).toFixed(0)}%`}
        arcLinkLabelsSkipAngle={0}
        arcLinkLabelsStraightLength={10}
        arcLinkLabelsTextColor="#000000"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }} // pad 색상에 따라감
        arcLabelsSkipAngle={10}
        theme={{
          labels: {
            text: {
              fontSize: 14,
              fill: "#000000",
            },
          },
          legends: {
            text: {
              fontSize: 12,
              fill: "#000000",
            },
          },
        }}
        onClick={handle.padClick}
        motionConfig="wobbly"
        transitionMode="pushIn"
        legends={[
          {
            anchor: "bottom", // 위치
            direction: "row", // item 그려지는 방향
            justify: false, // 글씨, 색상간 간격 justify 적용 여부
            translateX: 6, // chart와 X 간격
            translateY: 40, // chart와 Y 간격
            itemsSpacing: 0, // item간 간격
            itemWidth: 80, // item width
            itemHeight: 18, // item height
            itemDirection: "left-to-right", // item 내부에 그려지는 방향
            itemOpacity: 1, // item opacity
            symbolSize: 18, // symbol (색상 표기) 크기
            symbolShape: "circle", // symbol (색상 표기) 모양
            effects: [
              {
                // 추가 효과 설정 (hover하면 textColor를 olive로 변경)
                on: "hover",
                style: {
                  itemTextColor: "olive",
                },
              },
            ],
            onClick: handle.legendClick, // legend 클릭 이벤트
          },
        ]}
      />
    </div>
  );
};

// 분석결과 차트
function ShowCharts({ happy, sad, angry }) {
  const series = [happy, sad, angry];
  const options = {
    //data on the x-axis
    labels: ["행복😆", "우울😥", "폭력😡"],
    colors: ["#A9D5C7", "#F7BF87", "#FFB3B3"],
    chart: {
      type: "pie",
    },
    plotOptions: {
      pie: {
        donut: {},
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          {/* <Chart options={options} series={series} type="pie" /> */}
        </div>
      </div>
    </div>
  );
}

export default function AnalysisModal({ open, handleClose, happy, sad, angry }) {
  const navigate = useNavigate();

  return (
    <Dialog open={open}>
      <DialogTitle>그림 분석 결과</DialogTitle>

      <Container
        style={{
          textAlign: "center",
        }}
      >
        <Piechart happy={happy} sad={sad} angry={angry} />
        {/* <ShowCharts happy={happy} sad={sad} angry={angry}></ShowCharts> */}
      </Container>

      <DialogActions
        sx={{ display: "flex", justifyContent: "center", marginTop: "5%", marginBottom: "5%" }}
      >
        <Button width="100px" onClick={handleClose}>
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
}
