module.exports = paginate = body => {
  const { pagination } = body || {};
  
  let offset = pagination?.offset || 0;
  let limit = pagination?.limit || 5;
  const recordsPerPage = limit - offset;
  const prevOffset = offset - recordsPerPage;
  const prevLimit = limit - recordsPerPage;
  let meta = {
    nextOffset: offset + recordsPerPage,
    nextLimit: limit + recordsPerPage,
    prevOffset: prevOffset > 0 ? prevOffset : undefined,
    prevLimit: prevLimit > 0 ? prevLimit : undefined,
  };

  return { offset, limit, recordsPerPage, meta };
}