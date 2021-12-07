import React, {Component} from 'react';





class Help extends Component{
    constructor(props) {
        super(props)
        this.state = {
            swapID : '',
            process : '',
        }
    }
    render(){
        return(
            <div>
                <h5>Ether to ERC20</h5>
                <p>When performing an atomic swap between Ether and ERC20 tokens, the `AtomicSwapEtherToERC20` contract should be used. For this example, Alice holds Ether and Bob holds ERC20 tokens. Alice is looking to give Ether to Bob in exchange for his ERC20 tokens.</p>
                <p>1. Alice calls `open` using a unique `_swapID` that has been negotiated between both traders. This is a payable call and Alice must send her Ether when she makes this call.</p>
                <p>2. Bob calls `check` to verify the details of the trade. If he does not agree then he does not need to do anything. At any point, Alice can call `expire` and get a refund of her Ether. Doing this cancels the swap.</p>    
                <p>3. Bob provides an allowance to the `AtomicSwapEtherToERC20` contract, using his ERC20 contract to do so.</p>    
                <p> 4. Bob calls `close`, which will check the allowance and use it to transfer his ERC20 tokens to Alice. At the same time, it will transfer Alice's Ether to Bob. Alice can no longer expire the swap.</p>
                <h5>ERC20 to ERC20</h5>
                <p>When performing an atomic swap between Ether and an ERC20 token, the `AtomicSwapERC20ToERC20` contract should be used. For this example, Alice holds ERC20 tokens and Bob also holds ERC20 tokens. Alice is looking to give her ERC20 tokens to Bob in exchange for his ERC20 tokens, and Alice has agreed to initiate the atomic swap.</p>

                <p>1. Alice provides an allowance to the `AtomicSwapERC20ToERC20` contract, using her ERC20 contract to do so.</p>
                <p>2. Alice calls `open` using a unique `_swapID` that has been negotiated between both traders. The allowance will be checked and used to transfer Alice's ERC20 tokens to the `AtomicSwapERC20ToERC20` contract.</p>
                <p>3. Bob calls `check` to verify the details of the trade. If he does not agree then he does not need to do anything. At any point, Alice can call `expire` and get a refund of her ERC20 tokens. Doing this cancels the swap.</p>
                <p>4. Bob provides an allowance to the `AtomicSwapERC20ToERC20` contract, using his ERC20 contract to do so.</p>
                <p>5. Bob calls `close`, which will check the allowance and use it to transfer his ERC20 tokens to Alice. At the same time, it will transfer Alice's ERC20 tokens to Bob. Alice can no longer expire the swap.</p>
               
            </div>
        );
    }
}
export default Help;