install: #command install
	npm ci
lint:	# eslint
	npx eslint .
test:
	npx jest
test-coverage:
	npx jest --coverage
