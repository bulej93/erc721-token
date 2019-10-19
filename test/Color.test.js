const Color = artifacts.require('./Color.sol')
require('chai')
	.use(require('chai-as-promised'))
	.should()

contract('color', (accounts) => {
	let contract

	before(async () => {
		contract =  await Color.deployed()
	})

	describe('deployment', async () => {
		it('deploys successfuly', async () => {
			
			const address = contract.address
			assert.notEqual(address,'')
			assert.notEqual(address,null)
			assert.notEqual(address,0x0)
			assert.notEqual(address,undefined)
		})

		it('has a name', async () => {
			const name =  await contract.name()
			assert.equal(name,"Color")
		})

		it('has a symbol', async () => {
			const symbol =  await contract.symbol()
			assert.equal(symbol,"COLOR")
		})
	})

	describe('minting', async () => {
		it('creates a new token', async () => {
			const result = await contract.mint('#EC0DFD')
			const totalSupply = await contract.totalSupply()

			//success

			assert.equal(totalSupply,1)
			const event = result.logs[0].args
			assert.equal(event.tokenId.toNumber(), 1, 'id is correct')
			//assert.equal(event.from, '0x0000000000000000000000000000', 'from is correct')
			assert.equal(event.to, accounts[0], 'to is correct')


			//FAILIRE
			await contract.mint('#EC0DFD').should.be.rejected;
		})
	})

	describe('indexing', async () => {
		it('lists colors', async () => {
			await contract.mint('#EC0DFD')
			await contract.mint('#FFFFFF')
			await contract.mint('#000000')
			const totalSupply = await contract.totalSupply()

			let color 
			let result = []

			for (var i = 1; i <= totalSupply; i++) {
				color =  await contract.colors(i - 1)
				result.push(color)
			}
			
			let expected = ['#DE456','#EC0DFD','#FFFFFF','#000000']
			assert.equal(result.join(','), expected.join(','))
		})
	})

})
 