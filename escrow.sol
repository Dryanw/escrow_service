// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

library Roles {
    struct Role {
        mapping (address => bool) bearer;
    }

    /**
     * @dev Give an account access to this role.
     */
    function add(Role storage role, address account) internal {
        require(!has(role, account), "Roles: account already has role");
        role.bearer[account] = true;
    }

    /**
     * @dev Remove an account's access to this role.
     */
    function remove(Role storage role, address account) internal {
        require(has(role, account), "Roles: account does not have role");
        role.bearer[account] = false;
    }

    /**
     * @dev Check if an account has this role.
     * @return bool
     */
    function has(Role storage role, address account) internal view returns (bool) {
        require(account != address(0), "Roles: account is the zero address");
        return role.bearer[account];
    }
}

contract Escrow {
    using Roles for Roles.Role;

    address payable private _seller;
    Roles.Role private _buyers;
    Roles.Role private _agents;
    mapping(address => address) private _chosenAgent;
    mapping(address => address) private _agentToBuyer;
    mapping(address => uint256) private _prices;
    mapping(address => uint8) private _condition;
    mapping(address => bool) private _fundReceived;
    uint256 constant public _fee = 1000000;

    constructor() {
        _seller = payable(msg.sender);
    }

    modifier agentOnly {
        require(_agents.has(msg.sender), 'only agents can call this function');
        _;
    }

    modifier assignedAgent {
        require(_agentToBuyer[msg.sender] != address(0), 'not assigned to any buyer yet');
        _;
    }

    modifier isBuyer(address target) {
        require(_buyers.has(target), 'unknown buyer');
        _;
    }

    function register(address agent) public {
        require(msg.sender == _seller);
        _agents.add(agent);
    }

    function createTask(address buyer, address agent, uint256 price, uint8 condition) public {
        require(msg.sender == _seller, 'please create task through our website');
        require(_agents.has(agent), 'unknown agent');
        require(_agentToBuyer[agent] == address(0), 'agent is already occupied');
        _buyers.add(buyer);
        _chosenAgent[buyer] = agent;
        _agentToBuyer[agent] = buyer;
        _prices[buyer] = price;
        _condition[buyer] = condition;
    }

    receive() external payable isBuyer(msg.sender) {
        require(msg.value >= (_prices[msg.sender] + _fee), 'insufficient fund');
        _fundReceived[msg.sender] = true;
    }

    function checkCondition(uint8 status) external agentOnly view returns (bool) {
        require(_agentToBuyer[msg.sender] != address(0), 'not assigned to any buyer yet');
        return status >= _condition[_agentToBuyer[msg.sender]];
    }

    function isFundReceived() external agentOnly view returns (bool) {
        require(_agentToBuyer[msg.sender] != address(0), 'not assigned to any buyer yet');
        return _fundReceived[_agentToBuyer[msg.sender]];
    }

    function release(bool valid) external payable agentOnly assignedAgent {
        address buyer = _agentToBuyer[msg.sender];
        address receiver;
        if (valid) {
            receiver = _seller;
        } else {
            receiver = buyer;
        }
        require(_fundReceived[buyer], 'no fund received from buyer yet');
        payable(receiver).transfer(_prices[buyer]);
        payable(msg.sender).transfer(_fee);
        _agentToBuyer[msg.sender] = address(0);
        _chosenAgent[buyer] = address(0);
    }
}
