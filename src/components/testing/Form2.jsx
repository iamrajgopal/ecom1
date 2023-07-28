import { Button } from '@mui/material';
import React from 'react';
import {Controller,useForm} from 'react-hook-form';

function Form2() {
    const {control,handleSubmit,formState,setError} = useForm();

    let onSubmit = (data)=> {
    console.log(data)
    }

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor='name'>Name : </label>
        <Controller
        name='name'
        control={control}
        rules={{required:'Name Required'}}
        render={({field,fieldState})=>(<>
        <input id='name' type='text' {...field}></input>
        {fieldState.error && <p>{fieldState.error.message}</p>}
        </>)}
        />
      </div>
      <div>
        <label htmlFor='phone'>Phone : </label>
        <Controller
        name='phone'
        control={control}
        rules={{required:'phone number required',pattern:{
            value: /^[0-9]{10}$/,
            message:'Enter a Valid Number'
        }}}
        render={({field,fieldState})=>(<>
        <input id='phone' type='number' {...field}></input>
        {fieldState.error && <p>{fieldState.error.message}</p>}
        </>)}
        />
      </div>
      <div>
      <Button type="submit" disabled={formState.isSubmitting} variant='contained'>
          {formState.isSubmitting ? "Submitting..." : "Submit"}
        </Button>
       
      </div>
    </form>

    </>
  )
}

export default Form2