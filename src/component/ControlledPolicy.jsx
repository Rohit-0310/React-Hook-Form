import React from 'react'
import TextField from '@mui/material/TextField';
import "./style.css"
import { Alert, Box, Button, FormControl, Input, InputAdornment, InputLabel, MenuItem, Select, Slider, TextareaAutosize, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
// import ClearIcon from '@mui/icons-material/Clear';
// import { pink } from '@mui/material/colors';




import { useForm, useFieldArray, Controller } from 'react-hook-form'

const ControlledPolicy = () => {

    // const [discount, setDiscount] = useState("")
    // const [amount, setAmount] = useState("")

    const { control, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            holdername: '',
            amount: '',
            nominename: '',
            company: '',
            discountPercent: '',
            address: '',
            mobilenumber: '',
            familydetails: [{
                fmembername: '',
                fmemberrelation: '',
                fmemberdob: '',
                fmembermobile: '',

            }]
        }
    });

    const { fields, append, remove } = useFieldArray({ control, name: "familydetails" })

    const onSubmit = (data) => {
        console.log(data)

    }

    console.log(errors)

    const updateDiscount = () => {

        const [amount, disPer] = watch(["amount", "discountPercent"]);
        // console.log("watchResult", watchResult);
        console.log("amount", amount)
        console.log("disPer", disPer)
        if (amount && disPer) {
            return amount - (amount * disPer) / 100
        }
        else {
            return null;
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Typography sx={{ textAlign: "center" }} variant="h4">Add User Controll</Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>


                <Controller
                    name="holdername"
                    control={control}
                    rules={{ required: "Name is Required" }}
                    render={({ field }) =>
                        <TextField
                            {...field}
                            sx={{ m: 2, width: '35ch' }}
                            id="standard-basic"
                            label="Holder Name"
                            variant="standard"
                            placeholder={errors.holdername?.message}
                        />
                    }
                />
                {/* <Alert severity="error">{errors.holdername?.message}</Alert> */}
                {/* <span>{errors.holdername?.message}</span> */}


                <Controller
                    name="amount"
                    control={control}
                    rules={{ required: 'Amount is Required' }}
                    render={({ field }) =>
                        <FormControl sx={{ m: 2, width: '35ch' }} variant="standard">
                            <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
                            <Input
                                id="standard-adornment-amount"
                                type="number"
                                placeholder={errors.amount?.message}
                                {...field}
                                startAdornment={<InputAdornment position="start">₹</InputAdornment>}
                            />
                        </FormControl>}
                />
                {/* <p>{errors.amount?.message}</p> */}



                <Controller
                    name="nominename"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) =>
                        <TextField
                            {...field}
                            sx={{ m: 2, width: '35ch' }}
                            id="standard-basic"
                            label="Nomine Name"
                            variant="standard"
                        />
                    }
                />


                {/* -------------Controller ----------*/}



                <Controller
                    name="discountPercent"
                    control={control}
                    render={({ field }) => (
                        <FormControl variant="standard" sx={{ m: 2, width: '35ch' }}>
                            <InputLabel id="demo-simple-select-label">Discount</InputLabel>
                            <Select
                                label="Discount"
                                {...field}
                            >
                                <MenuItem value={10}>10%</MenuItem>
                                <MenuItem value={20}>20%</MenuItem>
                                <MenuItem value={30}>30%</MenuItem>
                                <MenuItem value={40}>40%</MenuItem>
                                <MenuItem value={50}>50%</MenuItem>
                            </Select>
                        </FormControl>
                    )}
                />

                {/* 
                <Controller
                    name="discountPercent"
                    control={control}
                    render={({ field }) => (
                        <FormControl variant="standard" sx={{ m: 2, width: '35ch' }}>
                            <InputLabel id="demo-simple-select-label">Discount</InputLabel>
                            <Slider label="Discount"
                                min={10}
                                max={50}
                                {...field} aria-label="Default" valueLabelDisplay="auto" />
                        </FormControl>
                    )}
                /> */}

                <Controller
                    name="company"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => <TextField
                        sx={{ m: 2, width: '35ch' }}
                        id="standard-basic"
                        label="Insurance Company"
                        variant="standard"
                        {...field} />}
                />

                <Controller
                    name="discountAmount"
                    control={control}
                    render={({ field }) => <TextField {...field}
                        sx={{ m: 2, width: '35ch' }}
                        id="standard-read-only-input"
                        label="Discounted Amount"
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="standard"
                        value={`₹ ${updateDiscount()}`}
                    />}
                />


            </Box>
            <hr />
            <br />

            {/* Family Members Details
                Useing useFieldArray */}
            <Typography variant="h6">Family Member Details</Typography>
            <Box>{
                fields.map((item, index) => {
                    return (
                        <Box key={item.id}>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', m: 1, border: '2px solid black' }}>
                                <Controller
                                    name={`familydetails.${index}.fmembername`}
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => <TextField sx={{ m: 2, width: '35ch' }}
                                        id="standard-basic"
                                        label="Family Member Name"
                                        variant="standard"
                                        {...field} />}
                                />




                                <Controller
                                    name={`familydetails.${index}.fmemberrelation`}
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <FormControl variant="standard" sx={{ m: 2, width: '35ch' }}>
                                            <InputLabel id="demo-simple-select-label">Relation</InputLabel>
                                            <Select
                                                label="Discount"
                                                {...field}
                                            >
                                                <MenuItem value={'Son'}>Son</MenuItem>
                                                <MenuItem value={'Daughter'}>Daughter</MenuItem>
                                                <MenuItem value={'Father'}>Father</MenuItem>
                                                <MenuItem value={'Mother'}>Mother</MenuItem>
                                                <MenuItem value={'GrandFather'}>GrandFather</MenuItem>
                                                <MenuItem value={'GrandMother'}>GrandMother</MenuItem>
                                            </Select>
                                        </FormControl>
                                    )}
                                />



                                {/* <Controller
                                    name={`familydetails.${index}.fmemberrelation`}
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => <TextField sx={{ m: 2, width: '35ch' }}
                                        id="standard-basic"
                                        label="Relation"
                                        variant="standard"
                                        {...field} />}
                                /> */}

                                <Controller
                                    name={`familydetails.${index}.fmemberdob`}
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => <TextField sx={{ m: 2, width: '35ch' }}
                                        id="standard-basic"
                                        label="Date of Birth"
                                        type="date"
                                        variant="standard"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        {...field} />}
                                />

                                <Controller
                                    name={`familydetails.${index}.fmembermobile`}
                                    control={control}
                                    rules={{
                                        required: "Mobile Number is Required",
                                        pattern: {
                                            value: /^[0-9]{10}$/,
                                            message: "This is not a valid Mobile Number",
                                        },
                                    }}
                                    render={({ field }) => <TextField sx={{ m: 2, width: '35ch' }}
                                        id="standard-basic"
                                        label="Mobile Number"
                                        variant="standard"
                                        {...field} />}
                                />

                            </Box >
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button
                                    sx={{ m: 2, width: '25ch' }}
                                    variant="outlined"
                                    color="error"
                                    startIcon={<DeleteIcon />}
                                    // endIcon={< ClearIcon sx={{ color: pink[500] }} />}
                                    onClick={() => { remove(index) }}
                                >Delete</Button>
                            </Box>
                        </Box>
                    )

                })}

                {/* <hr /> */}

                <Button variant="contained"
                    sx={{ m: 2, width: '28ch' }}
                    onClick={() => { append() }}
                    startIcon={<AddIcon />}
                >Add Family Menber</Button>

            </Box>

            <hr />
            <br />

            {/* Address Details */}

            <Typography variant="h6">Address Details</Typography>


            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>


                <Controller
                    name="address"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => <TextareaAutosize
                        {...field}
                        id="standard-basic"
                        label="minimum height"
                        minRows={3}
                        placeholder="Address"
                        style={{ margin: 2, width: '35ch' }}
                    />}
                />

                <Controller
                    name="mobilenumber"
                    control={control}
                    rules={{
                        required: "Mobile Number is Required",
                        pattern: {
                            value: /^[0-9]{10}$/,
                            message: "This is not a valid Mobile Number",
                        },
                    }}
                    render={({ field }) => <TextField {...field}
                        sx={{ m: 2, width: '35ch' }}
                        id="standard-basic"
                        type='number'
                        label="Mobile Number"
                        variant="standard"
                    />}
                />

            </Box>

            <Button type='submit' variant="contained" color="success" >Submit</Button>

        </form>
    )
}

export default ControlledPolicy