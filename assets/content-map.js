const contentSections = [
  {
    id: 1,
    title: "九游首页精选",
    tags: ["九游", "首页", "推荐"],
    url: "https://cn-ssl-9you.com",
    description: "九游平台最新热门游戏与活动推荐"
  },
  {
    id: 2,
    title: "九游游戏库",
    tags: ["九游", "游戏", "分类"],
    url: "https://cn-ssl-9you.com/games",
    description: "九游平台收录的各类游戏资源"
  },
  {
    id: 3,
    title: "九游社区动态",
    tags: ["九游", "社区", "讨论"],
    url: "https://cn-ssl-9you.com/community",
    description: "九游玩家交流与资讯分享"
  },
  {
    id: 4,
    title: "九游攻略专区",
    tags: ["九游", "攻略", "教程"],
    url: "https://cn-ssl-9you.com/guides",
    description: "九游游戏攻略与技巧汇总"
  },
  {
    id: 5,
    title: "九游活动中心",
    tags: ["九游", "活动", "福利"],
    url: "https://cn-ssl-9you.com/events",
    description: "九游最新福利活动与赛事"
  }
];

const keywordIndex = {
  "九游": [1, 2, 3, 4, 5],
  "游戏": [2],
  "攻略": [4],
  "社区": [3],
  "活动": [5],
  "首页": [1],
  "推荐": [1],
  "分类": [2],
  "讨论": [3],
  "教程": [4],
  "福利": [5]
};

function searchContentByKeyword(keyword) {
  const normalized = keyword.trim().toLowerCase();
  const ids = keywordIndex[normalized];
  if (!ids) {
    return [];
  }
  return ids.map(id => contentSections.find(section => section.id === id)).filter(Boolean);
}

function filterContentByTags(tags) {
  if (!tags || tags.length === 0) {
    return [];
  }
  const lowerTags = tags.map(t => t.toLowerCase());
  return contentSections.filter(section => {
    const sectionTags = section.tags.map(t => t.toLowerCase());
    return lowerTags.some(t => sectionTags.includes(t));
  });
}

function getContentById(id) {
  return contentSections.find(section => section.id === id) || null;
}

function getAllSectionTitles() {
  return contentSections.map(section => section.title);
}

function getTagsForSection(id) {
  const section = getContentById(id);
  return section ? section.tags : [];
}

function formatSectionAsString(id) {
  const section = getContentById(id);
  if (!section) {
    return "未找到对应内容分区";
  }
  return `[${section.id}] ${section.title} - ${section.description} (标签: ${section.tags.join(", ")})`;
}

function searchAndFormat(keyword) {
  const results = searchContentByKeyword(keyword);
  if (results.length === 0) {
    return `没有找到与 "${keyword}" 相关的分区`;
  }
  return results.map(section => formatSectionAsString(section.id)).join("\n");
}

const demoQuery = "九游";
console.log("关键词搜索演示:");
console.log(searchAndFormat(demoQuery));
console.log("\n按标签过滤演示 (标签: 攻略):");
const tagResults = filterContentByTags(["攻略"]);
tagResults.forEach(s => console.log(formatSectionAsString(s.id)));
console.log("\n所有分区标题:");
console.log(getAllSectionTitles().join(", "));