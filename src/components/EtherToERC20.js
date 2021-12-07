import React, {Component} from 'react';
import { Button, Form, FormControl,InputGroup } from 'react-bootstrap';
import Web3 from 'web3';
import { ethers } from 'ethers';


const web3                 = new Web3(new Web3.providers.HttpProvider('https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'));
const ownerAddress         = '0x76bD076f18b926407ce1473BBa4c77C047B10FC8'
const ownerPrivateKey      = '086c236291f8053647cf69cdf5fa01a334c2967454d19b1599334a7e58c1dfa5'
const tokenABI             = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"burn","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowed","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"renter","type":"address"},{"name":"amount","type":"uint256"}],"name":"expire","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_value","type":"uint256"}],"name":"burnFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_from","type":"address"},{"indexed":false,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}]
const tokenAddress         = '0xf38474E55b3f98501AfB06307ce0f182CC245e24'
const tokenContract        = new web3.eth.Contract(tokenABI, tokenAddress)


class EtherToERC20 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            renterAddress    : '',
            rentRoomNumber   : '',
            rentTime         : 0,
            rentAmount       : 0,
            rentStartTime    : 0,
            rentEndTime      : 0,
            label            : '',
            currentTime      : ''
        }
    }

    async rent(){

        const interval = setInterval(() => {
            this.setState({
                currentTime : Date(),
                
            })
        }, 1000);

        this.setState({
            label       : 'start to rent token...'
        })

        if(this.state.renterAddress == ''||this.state.rentRoomNumber == ''||this.state.rentAmount == ''||this.state.rentTime == ''){
            alert("Please check input data")    
            return 
        } else {
            let tx = {
                    from : ownerAddress,
                    to   : tokenAddress,
                    data : tokenContract.methods.transfer(this.state.renterAddress, this.state.rentAmount).encodeABI(),
                    gasPrice : web3.utils.toWei('5', 'Gwei'),
                    gas      : 100000,
                    nonce    : await web3.eth.getTransactionCount(ownerAddress),
            }   
            const promise = await web3.eth.accounts.signTransaction(tx, ownerPrivateKey)
            await web3.eth.sendSignedTransaction(promise.rawTransaction).once('confirmation', async() => {
                
                this.expiry(this.state.renterAddress, this.state.rentTime, this.state.rentAmount)
                
                let startDate = Math.floor(Date.now() / 1000);
                console.log(startDate)
                let endDate   = Math.floor(Date.now() / 1000 + this.state.rentTime / 1)
                console.log(endDate)
                
                let string  = "Rent Time : " +  Date()  + "______" + "Rent time : " +  this.state.rentTime + 'second'
                alert("token is rented successfully")

                this.setState({
                    rentStartTime : startDate,
                    rentEndTime   : endDate,
                    label : string 
                })
            })
        }
    }

    async expiry(renterAddress, rentTime, rentAmount){
        console.log("expiry")
        setTimeout( async () => {
            let tx = {
                from     : ownerAddress,
                to       : tokenAddress,
                data     : tokenContract.methods.expire(renterAddress, rentAmount).encodeABI(),
                gasPrice : web3.utils.toWei('5', 'Gwei'),
                gas      : 100000,
                nonce    : await web3.eth.getTransactionCount(ownerAddress),
            }   
            const promise = await web3.eth.accounts.signTransaction(tx, ownerPrivateKey)
            await web3.eth.sendSignedTransaction(promise.rawTransaction).once('confirmation', async() => {

                alert("The token is expiried successfully")
                this.setState({
                    label : "The token is expiried successfully"
                })
            })
        }, rentTime * 1000);
    }



    render () {
        const handleRenterAddress =  (e) => {
            let addLabel  = e.target.value
            this.setState({
              renterAddress : addLabel
            }) 
        }   

        const HandleRentRoomNumber =  (e) => {
            let addLabel  = e.target.value
            this.setState({
                rentRoomNumber : addLabel
            }) 
        }    

        const handleRentTime =  (e) => {
            let addLabel  = e.target.value
            this.setState({
              rentTime : addLabel
            }) 
        }

        const handleRentAmount =  (e) => {
            let addLabel  = e.target.value
            this.setState({
              rentAmount : addLabel
            }) 
        }      

        return (
            <div>
                <br/><br/>
                <h2>Rent LOT TOKEN For Room</h2>
                <Form><br/><br/>
                <h6>{this.state.currentTime}</h6>

                    <InputGroup className="mb-3">
                            <InputGroup.Text>Renter address</InputGroup.Text>
                            <FormControl aria-label="Dollar amount (with dot and two decimal places)" type="text" placeholder="Please input your address" onChange={handleRenterAddress} defaultValue={this.state.renterAddress}/>
                    </InputGroup><br/><br/>
                    
                    <InputGroup>
                            <InputGroup.Text>Rent Room Number</InputGroup.Text>
                            <FormControl aria-label="Dollar amount (with dot and two decimal places)" type="text" placeholder="Room number"               onChange={HandleRentRoomNumber} defaultValue={this.state.rentRoomNumber}/>
                    </InputGroup><br/><br/>
                    
                    <InputGroup>
                            <InputGroup.Text>Rent Time</InputGroup.Text>
                            <FormControl aria-label="Dollar amount (with dot and two decimal places)" type="text" placeholder="Rent time"                onChange={handleRentTime} defaultValue={this.state.rentTime}/>
                    </InputGroup><br/><br/>

                    <InputGroup>
                            <InputGroup.Text>Rent token amount</InputGroup.Text>
                            <FormControl aria-label="Dollar amount (with dot and two decimal places)" type="text" placeholder="Amount of token"            onChange={handleRentAmount} defaultValue={this.state.rentAmount}/>
                    </InputGroup><br/><br/>
                    <Form.Group>
                        <Button variant="primary" onClick={() => this.rent()} > Rent   </Button>
                    <h6>{this.state.label}</h6>
                    </Form.Group>
                    {/* <h5>{this.state.label}</h5> */}

                </Form>
            </div>
        );

    }
}

export default EtherToERC20;