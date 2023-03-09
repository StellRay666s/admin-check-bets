import * as React from 'react';
import PropTypes from 'prop-types';
import style from './index.module.scss'
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button,TextField } from "@mui/material";
import axios from 'axios'
import Header from '../../Components/Header';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

function Label({ componentName, valueType, isProOnly }) {
    const content = (
      <span>
        <strong>{componentName},</strong>
      </span>
    );
  
    if (isProOnly) {
      return (
        <Stack direction="row" spacing={0.5} component="span">
          <Tooltip title="Included on Pro package">
            <a href="/x/introduction/licensing/#pro-plan">
              <span className="plan-pro" />
            </a>
          </Tooltip>
          {content} 
        </Stack>
      );
    }
  
    return content;
  }


export default function Promos() {

  const [startPromo, setStartPromo] = React.useState('')
  const [finishPromo, setFinishPromo]= React.useState('')
  const [countDay, setCountDay] = React.useState(null)


  async function postPromoDate(){
    const response = await axios.post(`${process.env.REACT_APP_API_KEY}/createPromo`,{
      dateStart:startPromo,
      dateFinished:finishPromo,
      countDay:countDay
    })
    if(response.status === 200){
      toast.success('Промо акция добавлена!')
    }
  }

  async function getPromo(){
    const response = await axios.get(`${process.env.REACT_APP_API_KEY}/getPromo`)
   
    setCountDay(response.data.countDay)
    setStartPromo(response.data.dateStart)
    setFinishPromo(response.data.dateFinished)
  }

    Label.propTypes = {
        componentName: PropTypes.string.isRequired,
        isProOnly: PropTypes.bool,
        valueType: PropTypes.string.isRequired,
      };

      React.useEffect(()=>{
        getPromo()
      },[
        ])


  return (
  <>
    <Header/>
    <div className={style.date_wrapper} >
    <TextField
          style={{width:310}}
          id="standard-basic"
          label={`Длительность промоакции в днях: ${countDay}`}
          variant="outlined"
          onChange={(e)=>setCountDay(e.target.value)}
        />
    <LocalizationProvider  dateAdapter={AdapterDayjs}>
      <DemoContainer
      
        components={[
          'DatePicker',
          'TimePicker',
          'DateTimePicker',
          'DateRangePicker',
        ]}
      >
    
        <DemoItem label={<Label componentName={`Начало промо акции ${dayjs(startPromo).format('MM/DD/YYYY')}`} valueType="date" />}>
          <DatePicker  className ={style.inputs}  onChange={(e)=>setStartPromo(e.$d)} />
        </DemoItem>
      </DemoContainer>
      <DemoContainer
        components={[
          'DatePicker',
          'TimePicker',
          'DateTimePicker',
          'DateRangePicker',
        ]}
      >
        <DemoItem label={<Label componentName={`Конец промо акции ${dayjs(finishPromo).format('MM/DD/YYYY')}`} valueType="date" />}>
          <DatePicker     className ={style.inputs} onChange={(e)=>setFinishPromo(e.$d)} />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
    <Button onClick={()=>postPromoDate()}   sx={{ margin: 2 }}
              variant="contained"  >Добавить акцию</Button>
    </div>
    </>
  );
}