import React,{useRef} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button } from '@mui/material';
import { addNotes } from '../redux/slices/itemSlice';
import { useDispatch,useSelector } from 'react-redux';



export default function Crud() {
    let textRef = useRef();
    let titleRef = useRef();
    let dispatch = useDispatch();

    let obtainedData = useSelector((store)=>store.item.notes);

    let handlingText = (e)=>{
        e.preventDefault();
        let text = textRef.current.value;
        let title = titleRef.current.value;

        if(text && title){
           dispatch(addNotes({text,title}))
        }else{
            console.log("unable to console")
        }
    }
    
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl">
        <Box sx={{ bgcolor: '#cfe8fc', height: '80vh',display:'flex',flexDirection:'column',justifyContent:'flex-start',alignItems:'center' }} >
            <div>
                <label htmlFor='title' style={{display:'block',textAlign:'center'}}>Title</label>
                <input id='title' type='text' ref={textRef}></input>
            </div>
            <div>
                <label htmlFor='text' style={{display:'block',textAlign:'center'}}>Text</label>
                <textarea id='text' ref={titleRef}></textarea>
            </div>
            <div>
                <Button variant='contained' onClick={handlingText}>Submit</Button>
            </div>
             
        </Box>
      </Container>
      {console.log(obtainedData)}
    </React.Fragment>
  );
} 