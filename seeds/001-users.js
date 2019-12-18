exports.seed = function(knex) {
  // Deletes ALL existing entries
  // 000-cleanup already truncated
  return knex("users").insert([
    { username: "colin", password: "wordpass" },
    { username: "doug", password: "passWord" },
    { username: "ben", password: "password" }
  ]);
};
