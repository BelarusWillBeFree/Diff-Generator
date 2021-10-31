install: #command install
	npm ci
lint:	# eslint
	npx eslint .
test:
	NODE_OPTIONS=--experimental-vm-modules  npx jest
test-coverage:
	NODE_OPTIONS=--experimental-vm-modules  npx jest --coverage
run:
	node ./bin/gendiff.js ./__fixtures__/file1.json ./__fixtures__/file2.json