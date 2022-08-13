import React from 'react'
import TextField from '@mui/material/TextField';
import "./style.css"
import { Box, Button, FormControl, Input, InputAdornment, InputLabel, MenuItem, Select, TextareaAutosize, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';



import { useForm, useFieldArray, Controller } from 'react-hook-form'

const AddPolicy = () => {

    
    // const [discount, setDiscount] = useState("")
    // const [amount, setAmount] = useState("")

    const { register, control, handleSubmit, watch } = useForm({
        defaultValues: {
            familydetails: [{}]
        }
    });

    const { fields, append, remove } = useFieldArray({ control, name: "familydetails" })

    const onSubmit = (data) => {
        console.log(data)
    }


    const [amount, disPer] = watch(["amount", "discountPercent"]);
    // console.log("watchResult", watchResult);
    console.log("amount", amount)
    console.log("disPer", disPer)


    let discountAmount = amount - (amount * disPer) / 100

    console.log("discountAmount", discountAmount)

    // The following is useWatch example
    //   console.log(useWatch({ name: "test", control }));
    // json-server db.json --port 3001 --watch
    // fetch(`http://localhost:3001/AddUser`, {
    //     method: "POST",
    //     body: JSON.stringify(data),
    //     headers: {
    //         "content-type": "application/json",
    //     },
    // });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Typography sx={{ textAlign: "center" }} variant="h4">Add User</Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <TextField sx={{ m: 2, width: '35ch' }}
                    id="standard-basic"
                    label="Holder Name"
                    variant="standard"
                    {...register("holdername")}
                />
                <FormControl sx={{ m: 2, width: '35ch' }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
                    <Input
                        id="standard-adornment-amount"
                        type="number"
                        {...register("amount")}
                        // onChange={(e) => setAmount(e.target.value)}
                        startAdornment={<InputAdornment position="start">₹</InputAdornment>}
                    />
                </FormControl>



                <TextField
                    sx={{ m: 2, width: '35ch' }}
                    id="standard-basic"
                    label="Nomine Name"
                    variant="standard"
                    {...register("nominename")}
                />
                {/* <FormControl sx={{ m: 2, width: '35ch' }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-amount">Discount</InputLabel>
                    <Input
                        id="standard-adornment-amount"
                        type="number"
                        {...register("discount")}
                        startAdornment={<InputAdornment position="start">₹</InputAdornment>}
                    />
                </FormControl> */}

                {/* <Controller></Controller> */}


                {/* <section> */}

                <Controller
                    name="discountPercent"
                    control={control}
                    render={({ field }) => (
                        <FormControl sx={{ m: 2, width: '35ch' }}>
                            <InputLabel id="demo-simple-select-label">Discount</InputLabel>
                            <Select
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
                {/* </section> */}






                {/* <FormControl sx={{ m: 2, width: '35ch' }}>
                    <InputLabel id="demo-simple-select-label">Discount</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        {...register("discount")}
                        value={discount}
                        label="Discount"
                        onChange={(e) => setDiscount(e.target.value)}
                    >
                        <MenuItem value={10}>10%</MenuItem>
                        <MenuItem value={20}>20%</MenuItem>
                        <MenuItem value={30}>30%</MenuItem>
                        <MenuItem value={40}>40%</MenuItem>
                        <MenuItem value={50}>50%</MenuItem>
                    </Select>

                </FormControl> */}

                <TextField sx={{ m: 2, width: '35ch' }}
                    id="standard-basic"
                    label="Insurance Company"
                    variant="standard"
                    {...register("company")}
                />



                <TextField
                    sx={{ m: 2, width: '35ch' }}
                    id="standard-read-only-input"
                    label="Discount Amount"
                    defaultValue={discountAmount}
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="standard"
                    startAdornment={<InputAdornment position="start">₹</InputAdornment>}
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
                                <TextField sx={{ m: 2, width: '35ch' }}
                                    id="standard-basic"
                                    label="Family Member Name"
                                    variant="standard"
                                    {...register(`familydetails.${index}.fmembername`, { required: true })}
                                />

                                <TextField sx={{ m: 2, width: '35ch' }}
                                    id="standard-basic"
                                    label="Relation"
                                    variant="standard"
                                    {...register(`familydetails.${index}.fmemberrelation`, { required: true })}
                                />

                                <TextField sx={{ m: 2, width: '35ch' }}
                                    id="date"
                                    label="Date of Birth"
                                    type="date"
                                    {...register(`familydetails.${index}.fmemberdob`, { required: true })}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />


                                <TextField sx={{ m: 2, width: '35ch' }}
                                    id="standard-basic"
                                    type='number'
                                    label="Mobile Number"
                                    variant="standard"
                                    {...register(`familydetails.${index}.fmembermobile`, { required: true })}
                                />




                            </Box >
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button
                                    sx={{ m: 2, width: '25ch' }}
                                    variant="outlined"
                                    startIcon={<DeleteIcon />}
                                    onClick={() => { remove(index) }}
                                >Delete</Button>
                            </Box>
                        </Box>
                    )

                })}

                <hr />

                <Button variant="contained"
                    sx={{ m: 2, width: '25ch' }}
                    onClick={() => { append() }}
                >Add Family Menber</Button>

            </Box>

            <hr />
            <br />

            {/* Address Details */}

            <Typography variant="h6">Address Details</Typography>


            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>


                <TextareaAutosize
                    id="standard-basic"
                    label="minimum height"
                    minRows={3}
                    placeholder="Address"
                    style={{ margin: 2, width: '35ch' }}
                    {...register("address")}
                />

                <TextField sx={{ m: 2, width: '35ch' }}
                    id="standard-basic"
                    type='number'
                    label="Mobile Number"
                    variant="standard"
                    {...register("mobilenumber")}
                />
            </Box>





            <Button type='submit' variant="contained" color="success" >Submit</Button>

        </form>
    )
}

export default AddPolicy
