import { defineSchema, defineTable } from "convex/server";
import { type Infer, v } from "convex/values";

// schema for the trello app
const schema = defineSchema({
	boards: defineTable({
		id: v.string(),
		name: v.string(),
		color: v.string(),
	}).index("id", ["id"]),

	columns: defineTable({
		id: v.string(),
		boardId: v.string(),
		name: v.string(),
		order: v.number(),
	})
		.index("id", ["id"])
		.index("board", ["boardId"]),

	items: defineTable({
		id: v.string(),
		title: v.string(),
		content: v.optional(v.string()),
		order: v.number(),
		columnId: v.string(),
		boardId: v.string(),
	})
		.index("id", ["id"])
		.index("board", ["boardId"])
		.index("column", ["columnId"]),
});

export default schema;

// schemas for backend

const board = schema.tables.boards.validator;
const column = schema.tables.columns.validator;
const item = schema.tables.items.validator;

export const updateBoardSchema = v.object({
	id: board.fields.id,
	name: v.optional(board.fields.name),
	color: v.optional(board.fields.color),
});

export const updateColumnSchema = v.object({
	id: column.fields.id,
	boardId: column.fields.boardId,
	name: v.optional(column.fields.name),
	order: v.optional(column.fields.order),
});

export const deleteItemSchema = v.object({
	id: item.fields.id,
	boardId: item.fields.boardId,
});

export const newColumnSchema = v.object({
	boardId: column.fields.boardId,
	name: column.fields.name,
});

export const deleteColumnSchema = v.object({
	id: column.fields.id,
	boardId: column.fields.boardId,
});

// schemas for frontend
export type Board = Infer<typeof board>;
export type Column = Infer<typeof column>;
export type Item = Infer<typeof item>;
