  import { ethers } from 'ethers';
  import './App.css';
  import Sample from './Sample/Sample';
  import { abi } from '../artifacts/contracts/ERSC/erc.sol/ERC.json'; 
  import { erc as address } from '../output.json';
  import { useState } from 'react';
  import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import React from 'react'
  import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
  import { useLocation,matchPath } from 'react-router-dom'
  import LoginPage from '../components/employee/LoginPage'
  import RegisterPage from '../components/employee/RegisterPage'
  import ForgetPasswordPage from '../components/pages/ForgetPasswordPage'
  import EmployeeDashboard from '../components/employee/EmployeeDashBoard'
  import ProfilePage from '../components/employee/UserProfile'
  import AddEmployee from '../components/admin/AddEmployee'
  import AboutPage from '../components/openPage/AboutPage'
  import OpenPage from '../components/openPage/Openpage'
  import RegisterCompany from "../components/admin/RegisterPageComp";
  import LoginComp from "../components/admin/LoginPage";
  import AdminDashBoard from "../components/admin/AdminDashBoard"
  import RealDash from "../components/admin/RealDash.js"
  import AddTask from '../components/admin/AddTask'
  import EmpProfile from "../components/admin/EmpProfile"
  import CalendarView from '../components/employee/EmployeeTaskView'
  import RewardTasks from '../components/admin/RewardTasks'
  import AssignTask from "../components/admin/CreateModal"
  import ViewTask from '../components/admin/ViewTask'
  // import Sample from "./Sample/Sample.js"
  import PlatformAdmin from "../components/Platform admin/Tokens reward"
import Product from "../components/ViewCertificate/Product"  // import Tes from "../components/Platform admin/Tes";
  import "./App.css"
import Award from "../components/admin/award1"
import ViewCertificate from './ViewCertificate/ViewCertificate';
import OwnerLogin from './Platform admin/OwnerLogin';


  const { getWeb3Modal, createWeb3Provider, connectWallet, EthereumContext, createContractInstance, log } = require('react-solidity-xdc3');

  var connectOptions = {
    rpcObj: {
      50: "https://erpc.xinfin.network",
      51: "https://erpc.apothem.network",
      888 : "http://13.234.98.154:8546"
    },
    network: "mainnet",
    toDisableInjectedProvider: true
  }

  function App() {
    const location = useLocation();


    const [connecting, setconnecting] = useState(false);

   
    const [ethereumContext, setethereumContext] = useState({});
    const web3Modal = getWeb3Modal(connectOptions);

    const connect = async (event) => {
      console.log("Clicked")
      event.preventDefault();
      const instance = await web3Modal.connect();
      const { provider, signer } = await createWeb3Provider(instance);
      const erc = await createContractInstance(address, abi, provider);
      const account = await signer.getAddress();
      localStorage.setItem("WalletAddress", account);

      setethereumContext({ provider, erc, account})
      log("Connect", "Get Address", await signer.getAddress());
      setconnecting(true);

    }
   
    const match = matchPath(location.pathname, { path: "/empprofile/:id" });
    const awarddpage = matchPath(location.pathname, {path : "/awardpage/:Name/:name/:Wallet"})


    const links = ( location.pathname === "/adminnnn");

    // const emplinks = (location.pathname === "/employeehome" || location.pathname === "/userprofile");

    // const ownerlink = (location.pathname === "/admin");

    return (
  //     <div className="App">
  //                     <div className="connect-button-container" style={{marginTop:"30px", position: "absolute", top: 0, right: 0, padding: "10px", zIndex: 999, textAlign: "right" }}>
  //                     <button style={{borderRadius:"20px", width:"200px", backgroundColor:"red"}} onClick={connect} disabled={connecting}>{connecting ? 'Connected...' : 'Connect Wallet'}
  //                     </button>
  // </div>
  <div className="App">
      
        {/* { 
              ownerlink && <OwnerButton connect={connect} connecting={connect} />}{connecting ? 'Connected...' : 'Connect Wallet'}
               { 
              emplinks && <EmpButton connect={connect} connected={connect} />}
              { 
              adminlinks && <AdminButton connect={connect} connected={connect} />} */}
              

        
          { links &&
          
         <div className="connect-button-container" style={{marginTop:"20px",textAlign:"center", position: "absolute", top: 0, right: 160, padding: "10px", zIndex: 999, textAlign: "right" }}>
            <button  style={{
      marginTop: "-0px",
      marginLeft: "00px",
      position: "absolute",
      fontSize: "17px",
      backgroundColor: "#1196B0",
      borderRadius: "10px",
      fontFamily: "Secular One",
      padding: "8px",
      width: "120px",
      zIndex:"-3"
    }}
    
    onMouseEnter={(e) => {
      e.target.style.background = "#330078";
      // e.target.style.border = "5px solid rgba(0, 0, 0, 0)";
    }}
    onMouseLeave={(e) => {
      e.target.style.background = "#1196B0";
    }} onClick={connect} disabled={connecting}>{connecting ? 'Connected' : 'Connect'}
            </button>
          </div>}
        <section>
          <EthereumContext.Provider value={ethereumContext}>
            <Router>
              <div>
            
                  <Switch>
                  
                      <Route exact path="/" component={OpenPage}/>
                      <Route exact path="/about" component={ AboutPage } />
                      <Route path="/login" component={ LoginPage } />
                      <Route path="/register" component={ RegisterPage } />
                      <Route path="/registercompany" component={ RegisterCompany } />
                      <Route path="/forget-password" component={ ForgetPasswordPage } />
                      <Route path="/userprofile" component={ProfilePage} />
                      <Route path="/logincomp" component={LoginComp}/>
                      <Route path="/assigntask/:Name/:name/:Wallet" component={AssignTask}/>
                      <Route path="/viewtask/:id" component={ViewTask}/>
                      <Route path="/awardpage/:Name/:name/:Wallet" component={Award}/>
                      <Route path="/ownerLogin" component={OwnerLogin}/>                      
                      <Route path="/employeetokens" component={EmployeeDashboard} />
                    
                      {/* <Route path="/addemployee" component={AddEmployee}/> */}
                      <Route path="/admindash" component={AdminDashBoard}/>
                      {/* <Route path="/viewtask" component={ViewTask}/> */}
                      <Route exact path="/employeehome" component={EmployeeDashboard}/>
                      {/* <Route path="/approvetask" component={ApproveTask}/> */}
                      <Route path="/empprofile/:_id" component={EmpProfile}/>
                      {/* <Route path="/real"   component={RealDash}/> */}
                      <Route path="/real" render={(props) => <RealDash {...props} connect={connect} />} />

                      {/* <Route path="/real" render={(props) => <RealDash {...props} walletaddd={walletaddd} />} /> */}

                      {/* <Route path="/real" render={(props) => <RealDash {...props} account={ethereumContext.account} />} /> */}

                      <Route path="/adde/:_id/:name/:address/:mobile/:email/:wallet" component={AddEmployee}/>
                      {/* <Route path="/emptask" component={CalendarView}/> */}
                      <Route path="/reward" component={RewardTasks}/>
                      <Route path="/admin" component={PlatformAdmin}/>
                      <Route path="/listFiles" component={Product}/>

                      
                      {/* <Route path="/addd" component={Tes}/> */}


                      {/* <Route path="/viewtask/:empName" component={ViewTask}/>    */}
                  </Switch>
              </div>
          </Router>
          </EthereumContext.Provider>
        </section>
        <ToastContainer hideProgressBar={true} />
      </div>
    );
  }

  export default App;
