// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ERC {
    address public owner;
    mapping(string => string) employeeFileMapping;

    mapping(address => bool) public companies;
    mapping(address => bool) public employees;
    mapping(address => string) public employeeNames;
    mapping(address => address[]) public companyEmployees;
    mapping(address => mapping(address => uint256)) public allowances;
    mapping(address => uint256) public balances;
    mapping(address => string) public companyNames;
    mapping(string => bool) public fileHashes; // changed mapping key type to bytes32
mapping(string => string) public taskFileMapping; // new mapping to store taskId for each file hash

    struct Employee {
        address employeeAddress;
        string name;
    }

    string public name;
    string public symbol;
    uint8 public decimals;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    constructor(string memory _name, string memory _symbol, uint8 _decimals) {
        owner = msg.sender;
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner can call this function.");
        _;
    }

    modifier onlyAdmin() {
        require(companies[msg.sender], "Only registered companies can call this function.");
        _;
    }

    function mint(address to, uint256 amount) public onlyOwner {
        require(to != address(0), "Invalid recipient address.");
        require(amount > 0, "Amount must be greater than 0.");
        balances[to] += amount;
        emit Transfer(address(0), to, amount);
    }

    function sendToCompany(uint256 amount, address companyaddress) public onlyOwner  {
        require(amount > 0, "Amount must be greater than 0.");
        require(companies[companyaddress], "Address must be registered as a company.");
        balances[companyaddress] += amount;
        emit Transfer(msg.sender, companyaddress, amount);
    }

    function regCompany(address companyaddress, string memory companyname) public onlyOwner {
        require(companyaddress != address(0), "Invalid company address.");
        require(!companies[companyaddress], "Company is already registered.");

        companies[companyaddress] = true;
        companyNames[companyaddress] = companyname;
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function regEmployee(address employeeaddress, string memory employeename) public onlyAdmin {
        require(employeeaddress != address(0), "Invalid employee address.");
        require(!employees[employeeaddress], "Employee is already registered.");

        employees[employeeaddress] = true;
        employeeNames[employeeaddress] = employeename;

        // Add the employee to the list of employees for the company that called this function
        companyEmployees[msg.sender].push(employeeaddress);
    }

    // function sendReward(address employeeaddress, uint256 amount) public onlyAdmin {
    //     require(employees[employeeaddress], "Address must be registered as an employee.");
    //     require(amount > 0, "Amount must be greater than 0.");
    //     require(balances[msg.sender] >= amount, "Not enough balance.");
    //     balances[msg.sender] -= amount;
    //     balances[employeeaddress] += amount;
    //     emit Transfer(msg.sender, employeeaddress, amount);
    // }

    function balanceOf(address account) public view returns (uint256) {
        return balances[account];
    }

function getEmployeeCount(address companyaddress) public view returns (uint256) {
    return companyEmployees[companyaddress].length;
}
// function registerFile(bytes32 filehash, uint256 taskId) public onlyAdmin {
//     require(!fileHashes[filehash], "File hash is already registered.");
//      require(taskFileMapping[taskId] != filehash, "A file with the same task ID is already registered.");
//     fileHashes[filehash] = true;
//     taskFileMapping[taskId] = filehash;
// }




// function registerFile(string memory fileHash, string memory taskId) public onlyAdmin {
//     require(!fileHashes[fileHash], "File hash is already registered.");
//     require(keccak256(abi.encodePacked(taskFileMapping[fileHash])) != keccak256(abi.encodePacked(taskId)), "A file with the same task ID is already registered.");

//     fileHashes[fileHash] = true;
//     taskFileMapping[taskId] = fileHash;
// }



function getCompanyEmployees(address companyaddress) public view returns (Employee[] memory) {
    Employee[] memory result = new Employee[](companyEmployees[companyaddress].length);
    for (uint i = 0; i < companyEmployees[companyaddress].length; i++) {
        result[i] = Employee(companyEmployees[companyaddress][i], employeeNames[companyEmployees[companyaddress][i]]);
    }
    return result;
}
function isCompanyRegistered(address companyaddress) public view returns (bool) {
    return companies[companyaddress];
}

function isEmployeeRegistered(address employeeaddress) public view returns (bool) {
    return employees[employeeaddress];
}
function getFileHash(string memory taskId) public view returns (string memory) {
    return taskFileMapping[taskId];
}
function getAwardHash(string memory employeeName) public view returns (string memory) {
    return employeeFileMapping[employeeName];
}

function registerFileAndSendReward(string memory fileHash, string memory employeeName, uint256 rewardAmount, address employeeAddress) public onlyAdmin {
    // Register the file hash for the employee
    require(!fileHashes[fileHash], "File hash is already registered.");
    require(keccak256(abi.encodePacked(employeeFileMapping[employeeName])) != keccak256(abi.encodePacked(fileHash)), "A file with the same employee name is already registered.");
    fileHashes[fileHash] = true;
    employeeFileMapping[employeeName] = fileHash;
    
    // Send the reward to the employee
    require(employees[employeeAddress], "Address must be registered as an employee.");
    require(rewardAmount > 0, "Reward amount must be greater than 0.");
    require(balances[msg.sender] >= rewardAmount, "Not enough balance.");
    balances[msg.sender] -= rewardAmount;
    balances[employeeAddress] += rewardAmount;
    emit Transfer(msg.sender, employeeAddress, rewardAmount);
}

function registerCertificateAndSendReward(string memory fileHash, string memory taskId, address employeeAddress, uint256 rewardAmount) public onlyAdmin {
    // Register the file hash for the task
    require(!fileHashes[fileHash], "File hash is already registered.");
    require(keccak256(abi.encodePacked(taskFileMapping[taskId])) != keccak256(abi.encodePacked(fileHash)), "A file with the same task ID is already registered.");
    fileHashes[fileHash] = true;
    taskFileMapping[taskId] = fileHash;
    
    // Send the reward to the employee
    require(employees[employeeAddress], "Address must be registered as an employee.");
    require(rewardAmount > 0, "Reward amount must be greater than 0.");
    require(balances[msg.sender] >= rewardAmount, "Not enough balance.");
    balances[msg.sender] -= rewardAmount;
    balances[employeeAddress] += rewardAmount;
    emit Transfer(msg.sender, employeeAddress, rewardAmount);
}

}


