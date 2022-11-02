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
import { DialogTitle } from "@mui/material";
import Chart from "react-apexcharts";

// 분석결과 차트
function ShowCharts({ happy, sad, angry }) {
  const series = [happy, sad, angry];
  const options = {
    //data on the x-axis
    labels: ["행복😆", "우울😥", "분노😡"],
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
          <Chart options={options} series={series} type="pie" />
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

      <div
        style={{
          fontSize: "2vh",
          textAlign: "center",
        }}
      >
        <ShowCharts happy={happy} sad={sad} angry={angry}></ShowCharts>
      </div>

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
