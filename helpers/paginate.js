module.exports = paginate = body => {
  const { pagination } = body || {};
  
  const offset = pagination?.offset || 0;
  const limit = pagination?.limit || 5;
  const recordsPerPage = limit - offset;
  const prevOffset = offset - limit;
  let meta = {
    nextOffset: offset + limit,
    prevOffset,
  };

  return { offset, limit, recordsPerPage, meta };
}