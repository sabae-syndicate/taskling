export const tasks = (pgm) => {
  pgm.createTable("tasks", {
    id: "id",
    userId: {
      type: "integer",
      notNull: true,
      references: '"users"',
      onDelete: "cascade",
    },
    title: { type: "varchar(255)", notNull: true },
    description: { type: "text" },
    status: "varchar(50)",
    dueDate: {
      type: "date",
      default: pgm.func("date"),
    },
    completed: "boolean",
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    completedAt: {
      type: "timestamp",
      default: null,
    },
    projectId: {
      type: "integer",
      references: "projects",
    },
    priority: "integer",
  });
  pgm.createIndex("tasks", "userId");
};
