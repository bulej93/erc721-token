pragma solidity 0.5.0;


import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";

contract Color is ERC721Full {

	string[] public colors;
	mapping(string => bool) _colorExists;

	constructor() ERC721Full("Color", "COLOR") public {

	}

	function mint (string memory _color) public {

		require(!_colorExists[_color]);
		uint _id = colors.push(_color);   		//push() adds it to the end of the array
		_mint(msg.sender, _id);
		_colorExists[_color] = true;
	}
}