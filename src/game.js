export default class Game {
	score = 0;
	lines = 0;
	level = 0;
	playfield = [
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[1,1,0,0,0,0,0,0,0,0],
		[1,1,0,0,0,0,0,0,0,0]
	];
	activePieceX = 0;
	activePieceY = 0;
	activePiece = {
		x: 0,
		y: 0,
		get blocks() {
			return this.rotations[this.rotationIndex];
		},
		blocks: [
			[0,1,0],
			[1,1,1],
			[0,0,0]
		]
	};

	movePieceLeft() {
		this.activePiece.x -=1;

		if (this.hasCollision()) {
			this.activePiece.x += 1;
		}
	}

	movePieceRight() {
		this.activePiece.x +=1;

		if (this.hasCollision()) {
			this.activePiece.x -= 1;
		}
	}

	movePieceDown() {
		this.activePiece.y +=1;

		if (this.hasCollision()) {
			this.activePiece.y -= 1;
			this.lockPiece();
		}
	}

	rotatePiece() {
		const blocks = this.activePiece.blocks;
		const length = blocks.length;
		const temp = [];
		for (let i = 0; i < length; i++) {
			temp[i] = new Array(length).fill(0);
		}
		for (let y = 0; y < length; y++) {
			for (let x = 0; x < length; x++) {
				temp[x][y] = blocks[length - 1 - y][x];
			}
		}

		this.activePiece.blocks = temp;
		if (this.hasCollision()) {
			this.activePiece.blocks = blocks;
		}
	}

	hasCollision() {
		const { y: pieceY, x: pieceX, blocks } = this.activePiece; // проводим реструкторизацию, чтобы упростить код
		const playfield = this.playfield;

		for (let y = 0; y < blocks.length; y++) {
			for (let x = 0; x < blocks[y].length; x++) {
				if (
					blocks[y][x] &&
					((playfield[pieceY + y] === undefined || playfield[pieceY + y][pieceX + x] === undefined) ||
					playfield[pieceY + y][pieceX + x])
				)
					return true;
			}
		}

		return false;
	}

	lockPiece() {
		const { y: pieceY, x: pieceX, blocks } = this.activePiece; // проводим реструкторизацию, чтобы упростить код
		const playfield = this.playfield;

		for (let y = 0; y < blocks.length; y++) {
			for (let x = 0; x < blocks[y].length; x++) {
				if (blocks[y][x])
					playfield[pieceY + y][pieceX + x] = blocks[y][x];
			}
		}
	}
}