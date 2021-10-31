install: #command install
	npm ci
lint:	# eslint
	npx eslint .
test:
	NODE_OPTIONS=--experimental-vm-modules  npx jest
test-coverage:
	NODE_OPTIONS=--experimental-vm-modules  npx jest --coverage
